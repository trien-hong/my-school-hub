from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from user.models import UserInvitation

User = get_user_model()

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active')
    list_filter = ('groups', 'is_staff', 'is_superuser', 'is_active')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('id',)

@admin.register(UserInvitation)
class UserInvitationAdmin(admin.ModelAdmin):
    list_display = ('invite_code', 'group_role', 'is_used', 'created_by', 'created_at')
    list_filter = ('group_role', 'is_used', 'created_at')
    search_fields = ('invite_code', 'created_by__username')
    readonly_fields = ('invite_code', 'created_at')