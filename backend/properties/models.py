from django.db import models

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