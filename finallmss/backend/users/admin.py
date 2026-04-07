from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ("id", "email", "first_name", "last_name", "role", "is_active", "is_staff")
    list_filter = ("role", "is_active", "is_staff", "is_superuser")
    search_fields = ("email", "first_name", "last_name", "username")
    ordering = ("-created_at",)

    fieldsets = UserAdmin.fieldsets + (
        (
            "LMS Profile",
            {"fields": ("role", "avatar_url", "bio", "phone_number", "created_at", "updated_at")},
        ),
    )
    readonly_fields = ("created_at", "updated_at")
