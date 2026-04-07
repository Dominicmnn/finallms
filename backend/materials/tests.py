from django.contrib.auth import get_user_model
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework import status
from rest_framework.test import APITestCase

from courses.models import Course
from materials.models import Material

User = get_user_model()


class MaterialApiTests(APITestCase):
    def setUp(self):
        self.tutor = User.objects.create_user(
            email="tutor@example.com",
            password="StrongPass123!",
            first_name="Tutor",
            last_name="One",
            role="tutor",
        )
        self.student = User.objects.create_user(
            email="student@example.com",
            password="StrongPass123!",
            first_name="Student",
            last_name="One",
            role="student",
        )
        self.course = Course.objects.create(
            title="API Testing",
            description="Material API course",
            category="Backend",
            level="intermediate",
            status="published",
            tutor=self.tutor,
        )
        self.course.enrolled_students.add(self.student)
        self.list_url = "/api/materials/"

    def _authenticate(self, email: str, password: str):
        login_response = self.client.post(
            "/api/auth/login/",
            {"email": email, "password": password},
            format="json",
        )
        token = login_response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_tutor_can_create_material(self):
        self._authenticate("tutor@example.com", "StrongPass123!")
        payload = {
            "course": self.course.id,
            "title": "Lesson video",
            "description": "Intro lesson",
            "type": "video",
            "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        }
        response = self.client.post(self.list_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["type"], "video")

    def test_student_cannot_create_material(self):
        self._authenticate("student@example.com", "StrongPass123!")
        payload = {
            "course": self.course.id,
            "title": "Student upload",
            "type": "pdf",
            "file_url": "https://example.com/file.pdf",
        }
        response = self.client.post(self.list_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_student_can_view_published_material(self):
        material = Material.objects.create(
            course=self.course,
            title="PDF Notes",
            type="pdf",
            file_url="https://example.com/notes.pdf",
            is_published=True,
            uploaded_by=self.tutor,
        )
        self._authenticate("student@example.com", "StrongPass123!")
        response = self.client.get(f"/api/materials/{material.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "PDF Notes")

    def test_tutor_can_upload_pdf_file(self):
        self._authenticate("tutor@example.com", "StrongPass123!")
        file = SimpleUploadedFile("lesson.pdf", b"PDF content", content_type="application/pdf")
        response = self.client.post(
            self.list_url,
            {
                "course": self.course.id,
                "title": "Uploaded PDF",
                "type": "pdf",
                "file": file,
            },
            format="multipart",
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["type"], "pdf")
        self.assertIn("file", response.data)
