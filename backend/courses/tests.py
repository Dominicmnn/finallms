from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from courses.models import Course
from materials.models import Material

User = get_user_model()


class CourseApiTests(APITestCase):
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
            title="Django Basics",
            description="Intro to Django",
            category="Web Development",
            level="beginner",
            status="published",
            tutor=self.tutor,
        )
        self.course.enrolled_students.add(self.student)
        self.list_url = "/api/courses/"

    def _authenticate(self, email: str, password: str):
        login_response = self.client.post(
            "/api/auth/login/",
            {"email": email, "password": password},
            format="json",
        )
        token = login_response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_tutor_can_create_course(self):
        self._authenticate("tutor@example.com", "StrongPass123!")
        payload = {
            "title": "React for Beginners",
            "description": "Frontend foundations",
            "category": "Frontend",
            "level": "beginner",
            "status": "draft",
        }
        response = self.client.post(self.list_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["title"], payload["title"])
        self.assertEqual(response.data["tutor"]["email"], "tutor@example.com")

    def test_student_cannot_create_course(self):
        self._authenticate("student@example.com", "StrongPass123!")
        payload = {
            "title": "Unauthorized Course",
            "description": "Should fail",
            "level": "beginner",
            "status": "draft",
        }
        response = self.client.post(self.list_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_student_can_list_published_or_enrolled_courses(self):
        self._authenticate("student@example.com", "StrongPass123!")
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("results", response.data)
        self.assertGreaterEqual(len(response.data["results"]), 1)

    def test_course_materials_endpoint_returns_materials(self):
        Material.objects.create(
            course=self.course,
            title="Lesson 1",
            description="Video intro",
            type="video",
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            uploaded_by=self.tutor,
        )
        self._authenticate("student@example.com", "StrongPass123!")
        response = self.client.get(f"/api/courses/{self.course.id}/materials/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
