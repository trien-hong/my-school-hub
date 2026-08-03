import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    user_invitation = models.ForeignKey('UserInvitation', on_delete=models.SET_NULL, null=True, blank=True, related_name='registered_users')

class UserInvitation(models.Model):
    GROUP_ROLE_CHOICES = [
        ('Administrator', 'Administrator'),
        ('Faculty', 'Faculty'),
        ('Guardian', 'Guardian'),
        ('Student', 'Student'),
    ]

    invite_code = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    group_role = models.CharField(max_length=13, choices=GROUP_ROLE_CHOICES)
    is_used = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
