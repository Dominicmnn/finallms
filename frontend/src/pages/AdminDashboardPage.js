import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Topbar from "@/components/navigation/Topbar";
import StatCard from "@/components/common/StatCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { courseService } from "@/services/courseService";
import { materialService } from "@/services/materialService";
import { userService } from "@/services/userService";
import { extractApiError } from "@/utils/api";
function AdminDashboardPage() {
    const [stats, setStats] = useState({ users: 0, courses: 0, materials: 0 });
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [actionMessage, setActionMessage] = useState("");
    const [busyActionKey, setBusyActionKey] = useState("");
    async function fetchAdminData() {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const [users, courses, materials] = await Promise.all([
                userService.listUsers({ ordering: "-id" }),
                courseService.listCourses(),
                materialService.listMaterials()
            ]);
            setStats({
                users: users.count,
                courses: courses.count,
                materials: materials.count
            });
            setUsers(users.items.slice(0, 8));
            setCourses(courses.items.slice(0, 8));
            setMaterials(materials.items.slice(0, 8));
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsLoading(false);
        }
    }
    async function handleToggleUser(user) {
        setBusyActionKey(`user-${user.id}`);
        setActionMessage("");
        try {
            await userService.updateUser(user.id, { is_active: !user.is_active });
            setActionMessage("User status updated.");
            await fetchAdminData();
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setBusyActionKey("");
        }
    }
    async function handleDeleteCourse(courseId) {
        if (!window.confirm("Delete this course?")) {
            return;
        }
        setBusyActionKey(`course-${courseId}`);
        setActionMessage("");
        try {
            await courseService.deleteCourse(courseId);
            setActionMessage("Course deleted.");
            await fetchAdminData();
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setBusyActionKey("");
        }
    }
    async function handleDeleteMaterial(materialId) {
        if (!window.confirm("Delete this material?")) {
            return;
        }
        setBusyActionKey(`material-${materialId}`);
        setActionMessage("");
        try {
            await materialService.deleteMaterial(materialId);
            setActionMessage("Material deleted.");
            await fetchAdminData();
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setBusyActionKey("");
        }
    }
    useEffect(() => {
        void fetchAdminData();
    }, []);
    if (isLoading) {
        return (_jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: _jsx(Spinner, { size: "lg" }) }));
    }
    if (errorMessage) {
        return _jsx(ErrorState, { message: errorMessage, onRetry: fetchAdminData });
    }
    return (_jsxs("div", { className: "min-h-screen bg-background-light", children: [_jsx(Topbar, { title: "Admin Dashboard", subtitle: "Manage users, course catalog, and platform content quality." }), _jsx("main", { className: "px-6 py-8 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-7xl space-y-8", children: [_jsxs("section", { className: "grid gap-6 sm:grid-cols-2 xl:grid-cols-3", children: [_jsx(StatCard, { label: "Total users", value: stats.users, icon: _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" }) }) }), _jsx(StatCard, { label: "Total courses", value: stats.courses, icon: _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }) }), _jsx(StatCard, { label: "Total materials", value: stats.materials, icon: _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" }) }) })] }), actionMessage ? (_jsx("div", { className: "rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700", children: actionMessage })) : null, _jsxs("section", { className: "grid gap-8 xl:grid-cols-3", children: [_jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-8 shadow-soft", children: [_jsx("h2", { className: "text-xl font-semibold text-text-primary", children: "Users" }), users.length === 0 ? (_jsx("p", { className: "mt-4 text-sm text-text-secondary", children: "No users returned by the API yet." })) : (_jsx("ul", { className: "mt-6 space-y-4", children: users.map((user) => (_jsxs("li", { className: "rounded-xl bg-slate-50 p-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-sm font-medium text-text-primary", children: [user.first_name, " ", user.last_name] }), _jsx("p", { className: "text-xs text-text-secondary", children: user.email })] }), _jsx(Badge, { label: user.role, tone: "info" })] }), _jsx("div", { className: "mt-4", children: _jsx(Button, { variant: "outline", disabled: busyActionKey === `user-${user.id}`, onClick: () => void handleToggleUser(user), className: "w-full", children: user.is_active === false ? "Activate" : "Deactivate" }) })] }, user.id))) }))] }), _jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-8 shadow-soft", children: [_jsx("h2", { className: "text-xl font-semibold text-text-primary", children: "Courses" }), courses.length === 0 ? (_jsx("p", { className: "mt-4 text-sm text-text-secondary", children: "No courses available." })) : (_jsx("ul", { className: "mt-6 space-y-4", children: courses.map((course) => (_jsxs("li", { className: "rounded-xl bg-slate-50 p-4", children: [_jsx("p", { className: "text-sm font-medium text-text-primary", children: course.title }), _jsx("p", { className: "text-xs text-text-secondary", children: course.category || "General" }), _jsx("div", { className: "mt-4", children: _jsx(Button, { variant: "danger", disabled: busyActionKey === `course-${course.id}`, onClick: () => void handleDeleteCourse(course.id), className: "w-full", children: "Delete" }) })] }, course.id))) }))] }), _jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-8 shadow-soft", children: [_jsx("h2", { className: "text-xl font-semibold text-text-primary", children: "Materials" }), materials.length === 0 ? (_jsx("p", { className: "mt-4 text-sm text-text-secondary", children: "No materials available." })) : (_jsx("ul", { className: "mt-6 space-y-4", children: materials.map((material) => (_jsxs("li", { className: "rounded-xl bg-slate-50 p-4", children: [_jsx("p", { className: "text-sm font-medium text-text-primary", children: material.title }), _jsx("p", { className: "text-xs text-text-secondary", children: material.type }), _jsx("div", { className: "mt-4", children: _jsx(Button, { variant: "danger", disabled: busyActionKey === `material-${material.id}`, onClick: () => void handleDeleteMaterial(material.id), className: "w-full", children: "Delete" }) })] }, material.id))) }))] })] })] }) })] }));
}
export default AdminDashboardPage;
