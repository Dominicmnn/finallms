import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import CourseCard from "@/components/common/CourseCard";
import Topbar from "@/components/navigation/Topbar";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Spinner from "@/components/ui/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { courseService } from "@/services/courseService";
import { extractApiError } from "@/utils/api";
function CoursesListPage() {
    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [level, setLevel] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const debouncedSearch = useDebounce(search, 300);
    const categoryOptions = useMemo(() => [
        { value: "", label: "All levels" },
        { value: "beginner", label: "Beginner" },
        { value: "intermediate", label: "Intermediate" },
        { value: "advanced", label: "Advanced" }
    ], []);
    async function fetchCourses() {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const response = await courseService.listCourses({
                search: debouncedSearch || undefined,
                level
            });
            setCourses(response.items);
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        void fetchCourses();
    }, [debouncedSearch, level]);
    return (_jsxs("div", { className: "min-h-screen bg-background-light", children: [_jsx(Topbar, { title: "Courses", subtitle: "Browse enrolled or available courses, and filter what you need quickly." }), _jsx("main", { className: "px-6 py-8 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-7xl space-y-8", children: [_jsx("section", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-soft", children: _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsx(InputField, { id: "courseSearch", label: "Search courses", placeholder: "Search by course title or description...", value: search, onChange: (event) => setSearch(event.target.value) }), _jsx(SelectField, { id: "courseLevel", label: "Filter by level", value: level, onChange: (event) => setLevel(event.target.value), options: categoryOptions })] }) }), isLoading ? (_jsx("div", { className: "flex min-h-[30vh] items-center justify-center", children: _jsx(Spinner, { size: "lg" }) })) : null, !isLoading && errorMessage ? _jsx(ErrorState, { message: errorMessage, onRetry: fetchCourses }) : null, !isLoading && !errorMessage && courses.length === 0 ? (_jsx(EmptyState, { title: "No courses found", message: "Try adjusting search terms or filters to find courses.", actionLabel: "Reset search", onAction: () => {
                                setSearch("");
                                setLevel("");
                            } })) : null, !isLoading && !errorMessage && courses.length > 0 ? (_jsx("section", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: courses.map((course) => (_jsx(CourseCard, { course: course }, course.id))) })) : null] }) })] }));
}
export default CoursesListPage;
