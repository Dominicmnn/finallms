from __future__ import annotations

from django.contrib.auth import get_user_model
from rest_framework import serializers

from users.serializers import UserSummarySerializer

from .models import Course

User = get_user_model()


class CourseSerializer(serializers.ModelSerializer):
    tutor = UserSummarySerializer(read_only=True)
    tutor_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role__in={"admin", "tutor"}),
        source="tutor",
        write_only=True,
        required=False,
        allow_null=True,
    )
    enrolled_students = UserSummarySerializer(many=True, read_only=True)
    enrollment_count = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = (
            "id",
            "title",
            "description",
            "category",
            "level",
            "status",
            "thumbnail_url",
            "tutor",
            "tutor_id",
            "enrollment_count",
            "enrolled_students",
            "start_date",
            "end_date",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at", "enrollment_count")

    def get_enrollment_count(self, obj: Course) -> int:
        return obj.enrolled_students.count()

    def validate(self, attrs):
        start_date = attrs.get("start_date", getattr(self.instance, "start_date", None))
        end_date = attrs.get("end_date", getattr(self.instance, "end_date", None))
        if start_date and end_date and end_date < start_date:
            raise serializers.ValidationError("end_date cannot be before start_date.")
        return attrs
