# LMS Frontend (React + TypeScript + Vite)

Frontend-only Learning Management System UI built for a separate Django REST backend.

## Tech Stack

- React + TypeScript
- Vite
- React Router
- Tailwind CSS
- Axios

## Frontend Scope

- No backend code included
- No Django/DRF implementation included
- No database/schema code included
- No Supabase/Firebase/backend service usage

## Features

- Authentication UI: login, signup, forgot-password, logout
- Persistent token/session handling in frontend storage
- Protected routes with role-based access
- Role-specific dashboards for admin, tutor, student
- Courses listing with search and level filtering
- Course detail page with metadata, enrolled students, and material preview
- Materials page grouped by `video`, `pdf`, `link`
- Material viewer:
  - Video embed area
  - PDF in-app iframe viewer + download link
  - External links opened safely in a new tab
- Profile page with editable user details
- Shared loading, error, empty states
- Responsive sidebar + top bar layout

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8000
```

All API calls are configured from this single base URL for Django backend compatibility.

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Expected Project Structure

```txt
src/
  assets/
  components/
  context/
  hooks/
  layouts/
  pages/
  routes/
  services/
  types/
  utils/
```

## API Integration Notes

- Endpoints are centralized in `src/services/endpoints.ts`
- Axios instance + auth token handling lives in `src/services/api.ts`
- JWT refresh behavior is implemented in an Axios response interceptor
- Service files isolate backend assumptions:
  - `authService.ts`
  - `courseService.ts`
  - `materialService.ts`
  - `userService.ts`

Adjust endpoint paths in one place to match your Django backend routes.
