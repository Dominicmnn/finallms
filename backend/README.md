# LMS Backend (Django + DRF + JWT)

Production-ready Django REST backend for the LMS frontend.

## Features

- Custom user model with role-based access: `admin`, `tutor`, `student`
- JWT authentication with refresh token rotation
- Auth endpoints:
  - `POST /api/auth/signup/`
  - `POST /api/auth/login/`
  - `POST /api/auth/token/refresh/`
  - `POST /api/auth/forgot-password/`
- User endpoints:
  - `GET/PATCH /api/users/me/`
  - `GET/PATCH/DELETE /api/users/{id}/` (admin only)
  - `GET /api/users/` (admin only)
- Courses endpoints:
  - `GET/POST /api/courses/`
  - `GET/PATCH/DELETE /api/courses/{id}/`
  - `GET/POST /api/courses/{id}/materials/`
- Materials endpoints:
  - `GET/POST /api/materials/`
  - `GET/PATCH/DELETE /api/materials/{id}/`

## Quick Start

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser --email admin@example.com
python manage.py runserver
```

## Environment

Copy `.env.example` values into your shell environment before running in production.

## Notes

- Default database is SQLite for fast local setup.
- CORS is pre-configured for Vite frontend on `localhost:5173`.
- All APIs use `Bearer` JWT auth.
