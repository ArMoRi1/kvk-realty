from django.contrib import admin
from .models import ContactRequest, TeamMember, BlogPost, Review

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'date', 'location')
    list_filter = ('type',)
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
    list_display = ('order', 'name', 'role', 'is_agent', 'phone', 'email', 'deals', 'experience')
    list_display_links = ('name',)
    list_filter = ('is_agent',)
    list_editable = ('order', 'is_agent')
    search_fields = ('name', 'role', 'email')
    ordering = ('order', 'name')

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('author', 'rating', 'agent', 'is_published', 'created_at')
    list_filter = ('is_published', 'rating', 'agent')
    list_editable = ('is_published',)
    search_fields = ('author', 'text')
    ordering = ('-created_at',)