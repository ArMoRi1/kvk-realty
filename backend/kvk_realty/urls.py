from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from properties.views import contact, agents_list

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/contact/', contact),
    path('api/agents/', agents_list),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)