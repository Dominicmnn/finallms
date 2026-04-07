from __future__ import annotations

from django.db.models import Q
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.viewsets import ModelViewSet

from .models import Material
from .serializers import MaterialSerializer


class MaterialViewSet(ModelViewSet):
    serializer_class = MaterialSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        queryset = Material.objects.select_related("course", "uploaded_by", "course__tutor").all()

        course_id = self.request.query_params.get("course")
        if course_id:
            queryset = queryset.filter(course_id=course_id)

        user = self.request.user
        if user.role == "student":
            queryset = queryset.filter(
                Q(is_published=True),
                Q(course__status="published") | Q(course__enrolled_students=user),
            ).distinct()

        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        course = serializer.validated_data["course"]

        if user.role == "student":
            raise PermissionDenied("Students cannot upload materials.")
        if user.role == "tutor" and course.tutor_id != user.id:
            raise PermissionDenied("Tutors can only upload materials to their own courses.")

        serializer.save(uploaded_by=user)

    def perform_update(self, serializer):
        user = self.request.user
        material = self.get_object()
        if user.role == "admin":
            serializer.save()
            return
        if user.role == "tutor" and material.course.tutor_id == user.id:
            serializer.save()
            return
        raise PermissionDenied("You do not have permission to edit this material.")

    def perform_destroy(self, instance):
        user = self.request.user
        if user.role == "admin":
            instance.delete()
            return
        if user.role == "tutor" and instance.course.tutor_id == user.id:
            instance.delete()
            return
        raise PermissionDenied("You do not have permission to delete this material.")
