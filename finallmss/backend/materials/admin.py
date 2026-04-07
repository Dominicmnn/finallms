from django.contrib import admin

from .models import Material


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "course", "type", "is_published", "uploaded_by", "created_at")
    list_filter = ("type", "is_published")
    search_fields = ("title", "description", "course__title")
