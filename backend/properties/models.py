from django.db import models

class BlogPost(models.Model):
    TYPE_CHOICES = [
        ('deal', 'Deal Story'),
        ('event', 'Event'),
        ('news', 'Market News'),
    ]

    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    date = models.DateField()
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=100, blank=True)
    image = models.ImageField(upload_to='blog/', blank=True)
    text = models.TextField()
    tag = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date']
        verbose_name = 'Blog Post'
        verbose_name_plural = 'Blog Posts'

    def __str__(self):
        return self.title

class Agent(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    photo = models.ImageField(upload_to='agents/', blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    deals = models.IntegerField(default=0)
    experience = models.IntegerField(default=0)

    class Meta:
        ordering = ['name']
        verbose_name = 'Agent'
        verbose_name_plural = 'Agents'

    def __str__(self):
        return f"{self.name} — {self.role}"

class ContactRequest(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField(blank=True)
    agent_name = models.CharField(max_length=100, blank=True)
    agent_email = models.EmailField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Contact Request'
        verbose_name_plural = 'Contact Requests'

    def __str__(self):
        return f"{self.name} — {self.email} ({self.created_at.strftime('%d.%m.%Y %H:%M')})"