from __future__ import annotations

from rest_framework import serializers

from users.serializers import UserSummarySerializer

from .models import Material


class MaterialSerializer(serializers.ModelSerializer):
    uploaded_by = UserSummarySerializer(read_only=True)
    file = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Material
        fields = (
            "id",
            "course",
            "title",
            "description",
            "type",
            "url",
            "file_url",
            "file",
            "external_url",
            "duration_seconds",
            "order",
            "is_published",
            "uploaded_by",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "uploaded_by", "created_at", "updated_at")

    def validate(self, attrs):
        instance = self.instance
        material_type = attrs.get("type", getattr(instance, "type", None))
        url = attrs.get("url", getattr(instance, "url", None))
        file_url = attrs.get("file_url", getattr(instance, "file_url", None))
        file = attrs.get("file", getattr(instance, "file", None))
        external_url = attrs.get("external_url", getattr(instance, "external_url", None))

        if material_type == Material.MaterialType.VIDEO and not (url or file_url or file):
            raise serializers.ValidationError("Video material requires url, file_url, or uploaded file.")

        if material_type == Material.MaterialType.PDF and not (file_url or url or file):
            raise serializers.ValidationError("PDF material requires file_url, url, or uploaded file.")

        if material_type == Material.MaterialType.LINK and not (external_url or url):
            raise serializers.ValidationError("Link material requires external_url or url.")

        return attrs
