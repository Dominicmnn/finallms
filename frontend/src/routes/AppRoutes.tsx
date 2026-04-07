import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import CourseDetailsPage from "@/pages/CourseDetailsPage";
import CoursesListPage from "@/pages/CoursesListPage";
import DashboardPage from "@/pages/DashboardPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import MaterialViewerPage from "@/pages/MaterialViewerPage";
import MaterialsPage from "@/pages/MaterialsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProfilePage from "@/pages/ProfilePage";
import SignupPage from "@/pages/SignupPage";
import StudentDashboardPage from "@/pages/StudentDashboardPage";
import TutorDashboardPage from "@/pages/TutorDashboardPage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import PublicOnlyRoute from "@/routes/PublicOnlyRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <SignupPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <ForgotPasswordPage />
          </PublicOnlyRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tutor"
          element={
            <ProtectedRoute allowedRoles={["tutor"]}>
              <TutorDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/courses" element={<CoursesListPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
        <Route path="/courses/:courseId/materials" element={<MaterialsPage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/materials/:materialId" element={<MaterialViewerPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
