import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class UserInvitation(models.Model):
    invite_code = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    group_role = models.CharField(max_length=50)
    is_used = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
