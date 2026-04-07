from __future__ import annotations

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("Email is required.")
        email = self.normalize_email(email)
        username = extra_fields.get("username") or self._build_username(email)
        extra_fields["username"] = username
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        if password is None:
            raise ValueError("Password is required.")
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", User.Role.ADMIN)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)

    def _build_username(self, email: str) -> str:
        base = email.split("@")[0].replace(".", "_").replace("+", "_")
        candidate = base[:150] or "user"
        counter = 1
        while self.model.objects.filter(username=candidate).exists():
            suffix = f"_{counter}"
            candidate = f"{base[:150 - len(suffix)]}{suffix}"
            counter += 1
        return candidate


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "admin", "Admin"
        TUTOR = "tutor", "Tutor"
        STUDENT = "student", "Student"

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True, blank=True)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.STUDENT)
    avatar_url = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()

    def save(self, *args, **kwargs):
        if not self.username:
            self.username = User.objects._build_username(self.email)  # noqa: SLF001
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.email} ({self.role})"
