import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Topbar from "@/components/navigation/Topbar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { courseService } from "@/services/courseService";
import { materialService } from "@/services/materialService";
import { extractApiError } from "@/utils/api";
function CourseDetailsPage() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    async function fetchCourseDetails() {
        if (!courseId) {
            return;
        }
        setIsLoading(true);
        setErrorMessage("");
        try {
            const [courseData, materialsData] = await Promise.all([
                courseService.getCourse(courseId),
                materialService.listMaterials(courseId)
            ]);
            setCourse(courseData);
            setMaterials(materialsData.items);
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        void fetchCourseDetails();
    }, [courseId]);
    if (isLoading) {
        return (_jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: _jsx(Spinner, { size: "lg" }) }));
    }
    if (errorMessage) {
        return _jsx(ErrorState, { message: errorMessage, onRetry: fetchCourseDetails });
    }
    if (!course) {
        return _jsx(EmptyState, { title: "Course not found", message: "This course does not exist or is unavailable." });
    }
    return (_jsxs("div", { className: "min-h-screen bg-background-light", children: [_jsx(Topbar, { title: course.title, subtitle: course.description, actions: _jsx(Link, { to: `/courses/${course.id}/materials`, children: _jsx(Button, { children: "Open materials" }) }) }), _jsx("main", { className: "px-6 py-8 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-7xl space-y-8", children: [_jsxs("section", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-4", children: [_jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-soft", children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-text-secondary", children: "Category" }), _jsx("p", { className: "mt-2 text-lg font-semibold text-text-primary", children: course.category || "General" })] }), _jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-soft", children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-text-secondary", children: "Level" }), _jsx("div", { className: "mt-2", children: _jsx(Badge, { label: course.level || "unspecified", tone: "info" }) })] }), _jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-soft", children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-text-secondary", children: "Status" }), _jsx("div", { className: "mt-2", children: _jsx(Badge, { label: course.status || "unknown", tone: course.status === "published" ? "success" : "warning" }) })] }), _jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-soft", children: [_jsx("p", { className: "text-xs uppercase tracking-wide text-text-secondary", children: "Enrollment" }), _jsx("p", { className: "mt-2 text-lg font-semibold text-text-primary", children: course.enrollment_count ?? 0 })] })] }), _jsxs("section", { className: "grid gap-8 lg:grid-cols-2", children: [_jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-8 shadow-soft", children: [_jsx("h2", { className: "text-xl font-semibold text-text-primary", children: "Recent materials" }), materials.length === 0 ? (_jsx("p", { className: "mt-4 text-sm text-text-secondary", children: "No materials added yet." })) : (_jsx("ul", { className: "mt-6 space-y-4", children: materials.slice(0, 5).map((material) => (_jsxs("li", { className: "flex items-center justify-between rounded-xl bg-slate-50 p-4 transition-colors duration-200 hover:bg-slate-100", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-text-primary", children: material.title }), _jsx("p", { className: "text-xs text-text-secondary", children: material.type })] }), _jsx(Link, { className: "text-sm font-semibold text-primary-600 hover:text-primary-700", to: `/materials/${material.id}`, children: "Open" })] }, material.id))) }))] }), _jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-8 shadow-soft", children: [_jsx("h2", { className: "text-xl font-semibold text-text-primary", children: "Enrolled students" }), course.enrolled_students && course.enrolled_students.length > 0 ? (_jsx("ul", { className: "mt-6 space-y-3", children: course.enrolled_students.map((student) => (_jsxs("li", { className: "rounded-xl bg-slate-50 p-4", children: [_jsxs("p", { className: "text-sm font-medium text-text-primary", children: [student.first_name, " ", student.last_name] }), _jsx("p", { className: "text-xs text-text-secondary", children: student.email })] }, student.id))) })) : (_jsx("p", { className: "mt-4 text-sm text-text-secondary", children: "No enrolled student details were returned by the API." }))] })] })] }) })] }));
}
export default CourseDetailsPage;
