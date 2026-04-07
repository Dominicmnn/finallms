from django.contrib import admin

from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "category", "level", "status", "tutor", "created_at")
    list_filter = ("level", "status", "category")
    search_fields = ("title", "description", "category", "tutor__email")
    filter_horizontal = ("enrolled_students",)
