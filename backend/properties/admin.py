from django.contrib import admin
from .models import ContactRequest, TeamMember, BlogPost, Review, Category, Role

@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('label', 'slug', 'is_agent')
    list_editable = ('is_agent',)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('label', 'slug', 'color')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date', 'location')
    list_filter = ('category',)
    search_fields = ('title', 'location')
    ordering = ('-date',)

@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'created_at', 'is_read')
    list_filter = ('is_read',)
    search_fields = ('name', 'email', 'phone')
    list_editable = ('is_read',)
    readonly_fields = ('name', 'email', 'phone', 'message', 'created_at')
    ordering = ('-created_at',)

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'email', 'deals', 'experience')
    list_filter = ('roles',)
    search_fields = ('name', 'email')
    ordering = ('name',)
    filter_horizontal = ('roles',)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author', 'rating', 'agent', 'is_published', 'created_at')
    list_filter = ('is_published', 'rating', 'agent')
    list_editable = ('is_published',)
    search_fields = ('author', 'text')
    ordering = ('-created_at',)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'agent':
            kwargs['queryset'] = TeamMember.objects.filter(roles__is_agent=True).distinct()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    