from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactRequest, Agent

@api_view(['GET'])
def agents_list(request):
    agents = Agent.objects.all()
    data = []
    for agent in agents:
        data.append({
            'id': agent.id,
            'name': agent.name,
            'role': agent.role,
            'photo': request.build_absolute_uri(agent.photo.url) if agent.photo else None,
            'phone': agent.phone,
            'email': agent.email,
            'deals': agent.deals,
            'experience': agent.experience,
        })
    return Response(data)   

@api_view(['POST'])
def contact(request):
    data = request.data
    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()
    message = data.get('message', '').strip()
    agent_name = data.get('agent_name', '').strip()
    agent_email = data.get('agent_email', '').strip()

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
        agent_name=agent_name,
        agent_email=agent_email,
    )

    # Формуємо лист
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

    # Отримувачі — бос завжди + агент якщо є
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
        return Response(
            {'warning': 'Saved, but email failed', 'detail': str(e)},
            status=status.HTTP_200_OK
        )

    return Response({'success': True}, status=status.HTTP_201_CREATED)