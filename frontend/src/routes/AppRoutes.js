import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(PublicOnlyRoute, { children: _jsx(LoginPage, {}) }) }), _jsx(Route, { path: "/signup", element: _jsx(PublicOnlyRoute, { children: _jsx(SignupPage, {}) }) }), _jsx(Route, { path: "/forgot-password", element: _jsx(PublicOnlyRoute, { children: _jsx(ForgotPasswordPage, {}) }) }), _jsxs(Route, { element: _jsx(ProtectedRoute, { children: _jsx(AppLayout, {}) }), children: [_jsx(Route, { path: "/dashboard", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { allowedRoles: ["admin"], children: _jsx(AdminDashboardPage, {}) }) }), _jsx(Route, { path: "/tutor", element: _jsx(ProtectedRoute, { allowedRoles: ["tutor"], children: _jsx(TutorDashboardPage, {}) }) }), _jsx(Route, { path: "/student", element: _jsx(ProtectedRoute, { allowedRoles: ["student"], children: _jsx(StudentDashboardPage, {}) }) }), _jsx(Route, { path: "/courses", element: _jsx(CoursesListPage, {}) }), _jsx(Route, { path: "/courses/:courseId", element: _jsx(CourseDetailsPage, {}) }), _jsx(Route, { path: "/courses/:courseId/materials", element: _jsx(MaterialsPage, {}) }), _jsx(Route, { path: "/materials", element: _jsx(MaterialsPage, {}) }), _jsx(Route, { path: "/materials/:materialId", element: _jsx(MaterialViewerPage, {}) }), _jsx(Route, { path: "/profile", element: _jsx(ProfilePage, {}) })] }), _jsx(Route, { path: "/home", element: _jsx(Navigate, { to: "/", replace: true }) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }));
}
export default AppRoutes;
