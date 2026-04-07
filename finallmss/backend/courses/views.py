from __future__ import annotations

from django.db.models import Q
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from materials.models import Material
from materials.serializers import MaterialSerializer

from .models import Course
from .serializers import CourseSerializer


class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        queryset = Course.objects.select_related("tutor").prefetch_related("enrolled_students")

        user = self.request.user
        if user.role == "student":
            queryset = queryset.filter(Q(status="published") | Q(enrolled_students=user)).distinct()

        search = self.request.query_params.get("search")
        category = self.request.query_params.get("category")
        level = self.request.query_params.get("level")
        status_param = self.request.query_params.get("status")

        if search:
            queryset = queryset.filter(Q(title__icontains=search) | Q(description__icontains=search))
        if category:
            queryset = queryset.filter(category__iexact=category)
        if level:
            queryset = queryset.filter(level=level)
        if status_param:
            queryset = queryset.filter(status=status_param)

        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        if user.role == "student":
            raise PermissionDenied("Students cannot create courses.")
        if user.role == "tutor":
            serializer.save(tutor=user)
            return
        serializer.save()

    def perform_update(self, serializer):
        user = self.request.user
        course = self.get_object()
        if user.role == "admin" or (user.role == "tutor" and course.tutor_id == user.id):
            serializer.save()
            return
        raise PermissionDenied("You do not have permission to update this course.")

    def perform_destroy(self, instance):
        user = self.request.user
        if user.role == "admin" or (user.role == "tutor" and instance.tutor_id == user.id):
            instance.delete()
            return
        raise PermissionDenied("You do not have permission to delete this course.")

    @action(detail=True, methods=["get", "post"], url_path="materials")
    def materials(self, request, pk=None):
        course = self.get_object()

        if request.method == "GET":
            materials = Material.objects.filter(course=course).select_related("uploaded_by")
            serializer = MaterialSerializer(materials, many=True)
            return Response(serializer.data)

        user = request.user
        if user.role == "student":
            raise PermissionDenied("Students cannot upload materials.")
        if user.role == "tutor" and course.tutor_id != user.id:
            raise PermissionDenied("Tutors can only upload materials to their own courses.")

        serializer = MaterialSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(course=course, uploaded_by=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
