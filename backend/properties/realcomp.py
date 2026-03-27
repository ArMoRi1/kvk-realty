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

def build_filter(filters):
    status = filters.get('status', 'all')

    if status == 'for rent':
        conditions = ["StandardStatus eq 'Active Rental'"]
    elif status == 'for sale':
        conditions = ["StandardStatus eq 'Active'"]
    else:  # all
        conditions = ["StandardStatus eq 'Active'"]

    if filters.get('min_price'):
        conditions.append(f"ListPrice ge {filters['min_price']}")
    if filters.get('max_price'):
        conditions.append(f"ListPrice le {filters['max_price']}")
    if filters.get('min_beds'):
        conditions.append(f"BedroomsTotal ge {filters['min_beds']}")
    if filters.get('min_baths'):
        conditions.append(f"BathroomsTotalInteger ge {filters['min_baths']}")
    if filters.get('min_sqft'):
        conditions.append(f"LivingArea ge {filters['min_sqft']}")
    if filters.get('max_sqft'):
        conditions.append(f"LivingArea le {filters['max_sqft']}")
    if filters.get('min_year'):
        conditions.append(f"YearBuilt ge {filters['min_year']}")
    if filters.get('max_year'):
        conditions.append(f"YearBuilt le {filters['max_year']}")
    if filters.get('waterfront') == 'yes':
        conditions.append("WaterfrontYN eq true")
    if filters.get('waterfront') == 'no':
        conditions.append("WaterfrontYN eq false")
    if filters.get('type') and filters['type'] != 'all':
        type_map = {
            'house': 'SingleFamilyResidence',
            'condo': 'Condominium',
            'townhouse': 'Townhouse',
            'multi-family': 'MultiFamily',
            'land': 'Land',
        }
        odata_type = type_map.get(filters['type'])
        if odata_type:
            conditions.append(f"PropertySubType eq '{odata_type}'")
    if filters.get('search'):
        s = filters['search']
        conditions.append(
            f"(contains(UnparsedAddress, '{s}') or contains(OriginalPostalCity, '{s}') or contains(PostalCode, '{s}'))"
        )

    return ' and '.join(conditions)


def build_orderby(sort):
    sort_map = {
        'price_asc': 'ListPrice asc',
        'price_desc': 'ListPrice desc',
        'newest': 'ModificationTimestamp desc',
        'sqft_asc': 'LivingArea asc',
        'sqft_desc': 'LivingArea desc',
    }
    return sort_map.get(sort, 'ModificationTimestamp desc')

def fetch_properties(page=1, per_page=10, filters=None):
    token = get_token()
    skip = (page - 1) * per_page

    query = {
        '$select': FIELDS,
        '$top': per_page,
        '$skip': skip,
        '$filter': build_filter(filters or {}),
        '$orderby': build_orderby((filters or {}).get('sort', 'default')),
        '$count': 'true',
    }

    response = requests.get(
        'https://idxapi.realcomp.com/odata/Property',
        headers={
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json',
        },
        params=query,
    )
    response.raise_for_status()
    data = response.json()
    return {
        'value': data.get('value', []),
        'total': data.get('@odata.count', 0),
    }

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