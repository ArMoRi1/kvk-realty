from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from properties.views import contact, agents_list, team_list, blog_list, blog_detail, reviews_list, review_create, categories_list, properties_list, property_media, proxy_image

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/contact/', contact),
    path('api/team/', team_list),
    path('api/agents/', agents_list),
    path('api/blog/', blog_list),
    path('api/blog/<int:pk>/', blog_detail),
	path('api/reviews/', reviews_list),
    path('api/reviews/create/', review_create),
	path('api/categories/', categories_list),
	path('api/properties/', properties_list),
	path('api/properties/<int:listing_key>/media/', property_media),
	path('api/proxy-image/', proxy_image),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)