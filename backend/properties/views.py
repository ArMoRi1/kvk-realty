from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactRequest

@api_view(['POST'])
def contact(request):
    data = request.data
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()
    message = data.get('message', '').strip()

    if not name or not email:
        return Response(
            {'error': 'Name and email are required'},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Зберігаємо в БД
    ContactRequest.objects.create(
        name=name,
        email=email,
        phone=phone,
        message=message,
    )

    # Відправляємо email
    subject = f'New Contact Request — {name}'
    body = f"""
New contact request from KVK Realty website:

Name:    {name}
Email:   {email}
Phone:   {phone or '—'}
Message: {message or '—'}
    """.strip()

    try:
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.CONTACT_EMAIL],
            fail_silently=False,
        )
    except Exception as e:
        # Заявка збережена в БД, але email не пішов
        return Response(
            {'warning': 'Saved, but email failed', 'detail': str(e)},
            status=status.HTTP_200_OK
        )

    return Response({'success': True}, status=status.HTTP_201_CREATED)