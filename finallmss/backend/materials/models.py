from django.conf import settings
from django.db import models

from courses.models import Course


class Material(models.Model):
    class MaterialType(models.TextChoices):
        VIDEO = "video", "Video"
        PDF = "pdf", "PDF"
        LINK = "link", "Link"

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="materials")
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=20, choices=MaterialType.choices)
    url = models.URLField(blank=True, null=True)
    file_url = models.URLField(blank=True, null=True)
    file = models.FileField(upload_to="materials/", blank=True, null=True)
    external_url = models.URLField(blank=True, null=True)
    duration_seconds = models.PositiveIntegerField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="uploaded_materials",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("order", "-created_at")

    def __str__(self) -> str:
        return f"{self.title} ({self.type})"
