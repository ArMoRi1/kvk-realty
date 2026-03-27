import requests
from django.conf import settings
from django.core.cache import cache

TOKEN_CACHE_KEY = 'realcomp_access_token'

FIELDS = ','.join([
    'ListingKeyNumeric',
    'ListPrice',
    'StandardStatus',
    'PropertySubType',
    'UnparsedAddress',
    'OriginalPostalCity',
    'PostalCode',
    'BedroomsTotal',
    'BathroomsTotalInteger',
    'LivingArea',
    'YearBuilt',
    'WaterfrontYN',
    'Latitude',
    'Longitude',
    'ListOfficeName',
    'ListOfficePhone',
    'ListAgentFullName',
    'ListAgentEmail',
    'ListAgentDirectPhone',
    'PhotosCount',
    'PublicRemarks',
    'ModificationTimestamp',
])

def get_token():
    token = cache.get(TOKEN_CACHE_KEY)
    if token:
        return token

    response = requests.post(
        'https://auth.realcomp.com/Token',
        headers={'Content-Type': 'application/json'},
        json={
            'client_id': settings.REALCOMP_CLIENT_ID,
            'client_secret': settings.REALCOMP_CLIENT_SECRET,
            'audience': 'rcapi.realcomp.com',
            'grant_type': 'client_credentials',
        }
    )
    response.raise_for_status()
    token = response.json()['access_token']
    cache.set(TOKEN_CACHE_KEY, token, timeout=60 * 60 * 23)
    return token


def fetch_properties(params=None):
    token = get_token()

    query = {
        '$select': FIELDS,
        '$top': 50,
        '$filter': "StandardStatus eq 'Active'",
    }
    if params:
        query.update(params)

    response = requests.get(
        'https://idxapi.realcomp.com/odata/Property',
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json',
        },
        params=query,
    )
    response.raise_for_status()
    return response.json().get('value', [])

def fetch_media(listing_key):
    token = get_token()
    response = requests.get(
        f'https://idxapi.realcomp.com/odata/Media',
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json',
        },
        params={
			'$filter': f'ResourceRecordKeyNumeric eq {listing_key}',
			'$select': 'MediaURL,Order',
			'$orderby': 'Order',
		}
    )
    response.raise_for_status()
    return response.json().get('value', [])

def fetch_first_photo(listing_key):
    token = get_token()
    response = requests.get(
        'https://idxapi.realcomp.com/odata/Media',
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json',
        },
        params={
            '$filter': f'ResourceRecordKeyNumeric eq {listing_key}',
            '$select': 'MediaURL',
            '$orderby': 'Order',
            '$top': 1,
        }
    )
    
    # Якщо токен протух — оновлюємо і пробуємо ще раз
    if response.status_code == 401:
        cache.delete(TOKEN_CACHE_KEY)
        token = get_token()
        response = requests.get(
            'https://idxapi.realcomp.com/odata/Media',
            headers={
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json',
            },
            params={
                '$filter': f'ResourceRecordKeyNumeric eq {listing_key}',
                '$select': 'MediaURL',
                '$orderby': 'Order',
                '$top': 1,
            }
        )

    response.raise_for_status()
    value = response.json().get('value', [])

    url = value[0].get('MediaURL') if value else None
    return url