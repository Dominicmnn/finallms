from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

User = get_user_model()


class AuthApiTests(APITestCase):
    def setUp(self):
        self.signup_url = "/api/auth/signup/"
        self.login_url = "/api/auth/login/"
        self.me_url = "/api/users/me/"

    def test_signup_returns_tokens_and_user(self):
        payload = {
            "email": "student@example.com",
            "first_name": "Test",
            "last_name": "Student",
            "role": "student",
            "password": "StrongPass123!",
        }
        response = self.client.post(self.signup_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertEqual(response.data["user"]["email"], payload["email"])

    def test_login_returns_tokens_and_user(self):
        User.objects.create_user(
            email="tutor@example.com",
            password="StrongPass123!",
            first_name="Tutor",
            last_name="User",
            role="tutor",
        )
        payload = {"email": "tutor@example.com", "password": "StrongPass123!"}
        response = self.client.post(self.login_url, payload, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertEqual(response.data["user"]["role"], "tutor")

    def test_me_requires_authentication(self):
        response = self.client.get(self.me_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_me_can_be_updated(self):
        user = User.objects.create_user(
            email="student2@example.com",
            password="StrongPass123!",
            first_name="Old",
            last_name="Name",
            role="student",
        )
        login_response = self.client.post(
            self.login_url,
            {"email": user.email, "password": "StrongPass123!"},
            format="json",
        )
        token = login_response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        response = self.client.patch(
            self.me_url,
            {"first_name": "New", "phone_number": "+254700000000"},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["first_name"], "New")
        self.assertEqual(response.data["phone_number"], "+254700000000")


class UserAdminApiTests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            email="admin@example.com",
            password="StrongPass123!",
            first_name="Admin",
            last_name="One",
            role="admin",
            is_staff=True,
        )
        self.student = User.objects.create_user(
            email="student@example.com",
            password="StrongPass123!",
            first_name="Student",
            last_name="One",
            role="student",
        )
        login_response = self.client.post(
            "/api/auth/login/",
            {"email": self.admin.email, "password": "StrongPass123!"},
            format="json",
        )
        token = login_response.data["access"]
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

    def test_admin_can_list_users(self):
        response = self.client.get("/api/users/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("results", response.data)

    def test_admin_can_update_user_active_state(self):
        response = self.client.patch(
            f"/api/users/{self.student.id}/",
            {"is_active": False},
            format="json",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.student.refresh_from_db()
        self.assertFalse(self.student.is_active)
