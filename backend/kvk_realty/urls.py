from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from properties.views import contact, agents_list, blog_list, blog_detail

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/contact/', contact),
    path('api/agents/', agents_list),
    path('api/blog/', blog_list),
    path('api/blog/<int:pk>/', blog_detail),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)