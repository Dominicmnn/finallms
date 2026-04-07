from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ForgotPasswordView, LoginView, MeView, RefreshTokenView, SignupView, UserViewSet

router = DefaultRouter()
router.register(r"users", UserViewSet, basename="users")

urlpatterns = [
    path("auth/login/", LoginView.as_view(), name="auth-login"),
    path("auth/signup/", SignupView.as_view(), name="auth-signup"),
    path("auth/token/refresh/", RefreshTokenView.as_view(), name="token-refresh"),
    path("auth/forgot-password/", ForgotPasswordView.as_view(), name="auth-forgot-password"),
    path("users/me/", MeView.as_view(), name="users-me"),
    path("", include(router.urls)),
]
