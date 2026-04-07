import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import CourseCard from "@/components/common/CourseCard";
import Topbar from "@/components/navigation/Topbar";
import StatCard from "@/components/common/StatCard";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { courseService } from "@/services/courseService";
import { materialService } from "@/services/materialService";
import { extractApiError } from "@/utils/api";
function StudentDashboardPage() {
    const [courses, setCourses] = useState([]);
    const [materialCount, setMaterialCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    async function fetchStudentData() {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const [courseResponse, materialResponse] = await Promise.all([
                courseService.listCourses({}),
                materialService.listMaterials()
            ]);
            setCourses(courseResponse.items);
            setMaterialCount(materialResponse.count);
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        void fetchStudentData();
    }, []);
    const activeCourses = useMemo(() => courses.filter((course) => course.status === "published" || !course.status).length, [courses]);
    if (isLoading) {
        return (_jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: _jsx(Spinner, { size: "lg" }) }));
    }
    if (errorMessage) {
        return _jsx(ErrorState, { message: errorMessage, onRetry: fetchStudentData });
    }
    return (_jsxs("div", { className: "min-h-screen bg-background-light", children: [_jsx(Topbar, { title: "Student Dashboard", subtitle: "Track your learning progress and keep up with available resources." }), _jsx("main", { className: "px-6 py-8 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-7xl space-y-8", children: [_jsxs("section", { className: "grid gap-6 sm:grid-cols-2 xl:grid-cols-3", children: [_jsx(StatCard, { label: "Enrolled courses", value: courses.length, icon: _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }) }), _jsx(StatCard, { label: "Active courses", value: activeCourses, icon: _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx(StatCard, { label: "Available materials", value: materialCount, icon: _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" }) }) })] }), _jsxs("section", { className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-text-primary", children: "Continue learning" }), courses.length === 0 ? (_jsx(EmptyState, { title: "No enrolled courses", message: "Once enrollment data is available, your courses will appear here." })) : (_jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: courses.map((course) => (_jsx(CourseCard, { course: course }, course.id))) }))] })] }) })] }));
}
export default StudentDashboardPage;
