from django.contrib import admin
from .models import ContactRequest, Agent, BlogPost

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

@admin.register(Agent)
class AgentAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'phone', 'email', 'deals', 'experience')
    search_fields = ('name', 'role', 'email')