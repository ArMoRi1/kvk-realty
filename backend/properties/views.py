from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.core.cache import cache
from django.conf import settings
from .models import ContactRequest, TeamMember, BlogPost, Review, Category, Role
from .realcomp import fetch_properties, fetch_media, fetch_first_photos_batch
import requests as req
import hashlib, json


@api_view(['GET'])
def proxy_image(request):
    url = request.GET.get('url')
    if not url:
        return Response({'error': 'No URL'}, status=400)
    try:
        r = req.get(url, timeout=10)
        from django.http import HttpResponse
        return HttpResponse(r.content, content_type=r.headers.get('Content-Type', 'image/jpeg'))
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def property_media(request, listing_key):
    try:
        media = fetch_media(listing_key)
        urls = [m.get('MediaURL') for m in media if m.get('MediaURL')]
        return Response(urls)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def properties_list(request):
    try:
        page = int(request.GET.get('page', 1))
        per_page = 10
        filters = {
            'status':    request.GET.get('status', 'all'),
            'search':    request.GET.get('search', ''),
            'min_price': request.GET.get('min_price', ''),
            'max_price': request.GET.get('max_price', ''),
            'beds':      request.GET.get('beds', ''),      # було min_beds
            'baths':     request.GET.get('baths', ''),     # було min_baths
            'min_sqft':  request.GET.get('min_sqft', ''),
            'max_sqft':  request.GET.get('max_sqft', ''),
            'min_year':  request.GET.get('min_year', ''),
            'max_year':  request.GET.get('max_year', ''),
            'waterfront': request.GET.get('waterfront', 'any'),
            'type':      request.GET.get('type', 'all'),
            'sort':      request.GET.get('sort', 'default'),
        }

        cache_key = 'props_' + hashlib.md5(
            json.dumps({'page': page, **filters}, sort_keys=True).encode()
        ).hexdigest()
        cached = cache.get(cache_key)
        if cached:
            return Response(cached)

        result = fetch_properties(page=page, per_page=per_page, filters=filters)
        raw = result['value']
        total = result['total']

        listing_keys = [p.get('ListingKeyNumeric') for p in raw]
        photos = fetch_first_photos_batch(listing_keys)

        data = [{
            'id':               p.get('ListingKeyNumeric'),
            'price':            p.get('ListPrice'),
            'status':           'Active Rental' if p.get('PropertyType') == 'ResidentialLease' else p.get('StandardStatus'),
            'type':             p.get('PropertySubType'),
            'property_type':    p.get('PropertyType'),
            'address':          p.get('UnparsedAddress'),
            'city':             p.get('OriginalPostalCity'),
            'zip':              p.get('PostalCode'),
            'beds':             p.get('BedroomsTotal'),
            'baths':            p.get('BathroomsTotalInteger'),
            'sqft':             p.get('LivingArea'),
            'year_built':       p.get('YearBuilt'),
            'waterfront':       p.get('WaterfrontYN'),
            'lat':              p.get('Latitude'),
            'lng':              p.get('Longitude'),
            'list_office':      p.get('ListOfficeName'),
            'list_office_phone': p.get('ListOfficePhone'),
            'list_agent':       p.get('ListAgentFullName'),
            'list_agent_email': p.get('ListAgentEmail'),
            'list_agent_phone': p.get('ListAgentDirectPhone'),
            'photos_count':     p.get('PhotosCount'),
            'description':      p.get('PublicRemarks'),
            'updated_at':       p.get('ModificationTimestamp'),
            'image':            photos.get(p.get('ListingKeyNumeric')),
        } for p in raw]

        response_data = {
            'results':  data,
            'total':    total,
            'page':     page,
            'has_more': (page * per_page) < total,
        }
        cache.set(cache_key, response_data, timeout=60 * 60 * 12)
        return Response(response_data)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def categories_list(request):
    categories = Category.objects.all()
    data = [{'slug': c.slug, 'label': c.label, 'color': c.color} for c in categories]
    return Response(data)


@api_view(['GET'])
def blog_list(request):
    posts = BlogPost.objects.all()
    data = []
    for post in posts:
        data.append({
            'id': post.id,
            'category_slug':  post.category.slug if post.category else None,
            'category_label': post.category.label if post.category else None,
            'category_color': post.category.color if post.category else None,
            'date':     post.date.strftime('%B %d, %Y'),
            'title':    post.title,
            'location': post.location,
            'image':    request.build_absolute_uri(post.image.url) if post.image else None,
            'text':     post.text,
        })
    return Response(data)


@api_view(['GET'])
def blog_detail(request, pk):
    try:
        post = BlogPost.objects.get(pk=pk)
    except BlogPost.DoesNotExist:
        return Response({'error': 'Not found'}, status=status.HTTP_404_NOT_FOUND)
    data = {
        'id': post.id,
        'category_slug':  post.category.slug if post.category else None,
        'category_label': post.category.label if post.category else None,
        'category_color': post.category.color if post.category else None,
        'date':     post.date.strftime('%B %d, %Y'),
        'title':    post.title,
        'location': post.location,
        'image':    request.build_absolute_uri(post.image.url) if post.image else None,
        'text':     post.text,
    }
    return Response(data)


@api_view(['GET'])
def team_list(request):
    members = TeamMember.objects.all()
    data = []
    for member in members:
        data.append({
            'id':           member.id,
            'name':         member.name,
            'roles':        [{'slug': r.slug, 'label': r.label} for r in member.roles.all()],
            'photo':        request.build_absolute_uri(member.photo.url) if member.photo else None,
            'phone':        member.phone,
            'email':        member.email,
            'deals':        member.deals,
            'total_volume': member.total_volume,
            'bio':          member.bio,
            'motto':        member.motto,
            'experience':   member.experience,
        })
    return Response(data)


@api_view(['GET'])
def agents_list(request):
    agents = TeamMember.objects.filter(roles__is_agent=True).distinct()
    data = []
    for agent in agents:
        data.append({
            'id':           agent.id,
            'name':         agent.name,
            'roles':        [{'slug': r.slug, 'label': r.label} for r in agent.roles.all()],
            'photo':        request.build_absolute_uri(agent.photo.url) if agent.photo else None,
            'phone':        agent.phone,
            'email':        agent.email,
            'deals':        agent.deals,
            'total_volume': agent.total_volume,
            'bio':          agent.bio,
            'motto':        agent.motto,
            'experience':   agent.experience,
        })
    return Response(data)


@api_view(['POST'])
def contact(request):
    data = request.data
    name       = data.get('name', '').strip()
    email      = data.get('email', '').strip()
    phone      = data.get('phone', '').strip()
    message    = data.get('message', '').strip()
    agent_name  = data.get('agent_name', '').strip()
    agent_email = data.get('agent_email', '').strip()

    if not name or not email:
        return Response({'error': 'Name and email are required'}, status=status.HTTP_400_BAD_REQUEST)

    ContactRequest.objects.create(
        name=name, email=email, phone=phone,
        message=message, agent_name=agent_name, agent_email=agent_email,
    )

    agent_line = f"Agent:   {agent_name} ({agent_email})" if agent_name else "Source:  General Contact Form"
    subject = f'New Contact Request — {name}'
    body = f"""
New contact request from KVK Realty website:

Name:    {name}
Email:   {email}
Phone:   {phone or '—'}
Message: {message or '—'}
{agent_line}
    """.strip()

    recipients = [settings.CONTACT_EMAIL]
    if agent_email:
        recipients.append(agent_email)

    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipients,
            fail_silently=False,
        )
    except Exception as e:
        return Response({'warning': 'Saved, but email failed', 'detail': str(e)}, status=status.HTTP_200_OK)

    return Response({'success': True}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def reviews_list(request):
    agent_id = request.GET.get('agent')
    page     = int(request.GET.get('page', 1))
    per_page = int(request.GET.get('per_page', 10))

    reviews = Review.objects.filter(is_published=True)
    if agent_id:
        reviews = reviews.filter(agent_id=agent_id)

    total    = reviews.count()
    start    = (page - 1) * per_page
    reviews  = reviews[start:start + per_page]

    data = [{
        'id':         r.id,
        'author':     r.author,
        'text':       r.text,
        'rating':     r.rating,
        'agent_name': r.agent.name if r.agent else None,
        'agent_id':   r.agent.id if r.agent else None,
        'created_at': r.created_at.strftime('%B %d, %Y'),
    } for r in reviews]

    return Response({'results': data, 'total': total, 'page': page, 'per_page': per_page})


@api_view(['POST'])
def review_create(request):
    data   = request.data
    author = data.get('author', '').strip()
    text   = data.get('text', '').strip()
    rating = data.get('rating', 5)
    agent_id = data.get('agent_id')

    if not author or not text:
        return Response({'error': 'Author and text are required'}, status=status.HTTP_400_BAD_REQUEST)

    agent = None
    if agent_id:
        try:
            agent = TeamMember.objects.get(pk=agent_id, roles__is_agent=True)
        except TeamMember.DoesNotExist:
            pass

    Review.objects.create(
        author=author, text=text,
        rating=int(rating), agent=agent, is_published=False,
    )
    return Response({'success': True}, status=status.HTTP_201_CREATED)