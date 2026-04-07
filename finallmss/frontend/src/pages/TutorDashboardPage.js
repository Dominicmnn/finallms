import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import Topbar from "@/components/navigation/Topbar";
import StatCard from "@/components/common/StatCard";
import CourseCard from "@/components/common/CourseCard";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { courseService } from "@/services/courseService";
import { materialService } from "@/services/materialService";
import { extractApiError } from "@/utils/api";
function TutorDashboardPage() {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [materialCount, setMaterialCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [actionMessage, setActionMessage] = useState("");
    const [isCreatingCourse, setIsCreatingCourse] = useState(false);
    const [isCreatingMaterial, setIsCreatingMaterial] = useState(false);
    const [newCourseTitle, setNewCourseTitle] = useState("");
    const [newCourseDescription, setNewCourseDescription] = useState("");
    const [newCourseCategory, setNewCourseCategory] = useState("");
    const [newCourseLevel, setNewCourseLevel] = useState("beginner");
    const [newMaterialCourseId, setNewMaterialCourseId] = useState("");
    const [newMaterialTitle, setNewMaterialTitle] = useState("");
    const [newMaterialType, setNewMaterialType] = useState("video");
    const [newMaterialUrl, setNewMaterialUrl] = useState("");
    const [newMaterialFile, setNewMaterialFile] = useState(null);
    const [newMaterialDescription, setNewMaterialDescription] = useState("");
    const materialFileInputRef = useRef(null);
    async function fetchTutorData() {
        setIsLoading(true);
        setErrorMessage("");
        try {
            const [courseResponse, materialResponse] = await Promise.all([
                courseService.listCourses({}),
                materialService.listMaterials()
            ]);
            const ownedCourses = courseResponse.items.filter((course) => course.tutor?.id === user?.id || !course.tutor);
            setCourses(ownedCourses);
            if (!newMaterialCourseId && ownedCourses.length > 0) {
                setNewMaterialCourseId(String(ownedCourses[0].id));
            }
            setMaterialCount(materialResponse.count);
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsLoading(false);
        }
    }
    async function handleCreateCourse(event) {
        event.preventDefault();
        setActionMessage("");
        setErrorMessage("");
        setIsCreatingCourse(true);
        try {
            await courseService.createCourse({
                title: newCourseTitle,
                description: newCourseDescription,
                category: newCourseCategory || undefined,
                level: newCourseLevel,
                status: "draft"
            });
            setActionMessage("Course created successfully.");
            setNewCourseTitle("");
            setNewCourseDescription("");
            setNewCourseCategory("");
            setNewCourseLevel("beginner");
            await fetchTutorData();
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsCreatingCourse(false);
        }
    }
    async function handleCreateMaterial(event) {
        event.preventDefault();
        if (!newMaterialCourseId) {
            setErrorMessage("Select a course before uploading material.");
            return;
        }
        setActionMessage("");
        setErrorMessage("");
        setIsCreatingMaterial(true);
        try {
            const trimmedUrl = newMaterialUrl.trim();
            const formData = new FormData();
            formData.append("course", String(newMaterialCourseId));
            formData.append("title", newMaterialTitle);
            formData.append("description", newMaterialDescription || "");
            formData.append("type", newMaterialType);
            if (newMaterialFile) {
                formData.append("file", newMaterialFile);
            }
            if (newMaterialType === "link") {
                if (!trimmedUrl) {
                    setErrorMessage("Provide an external link for this material.");
                    return;
                }
                formData.append("external_url", trimmedUrl);
            }
            if (newMaterialType === "video") {
                if (!newMaterialFile && !trimmedUrl) {
                    setErrorMessage("Upload a video file or provide a remote video URL.");
                    return;
                }
                if (trimmedUrl) {
                    formData.append("url", trimmedUrl);
                }
            }
            if (newMaterialType === "pdf") {
                if (!newMaterialFile && !trimmedUrl) {
                    setErrorMessage("Upload a PDF file or provide a remote PDF URL.");
                    return;
                }
                if (trimmedUrl) {
                    formData.append("file_url", trimmedUrl);
                }
            }
            await materialService.createMaterial(formData);
            setActionMessage("Material uploaded successfully.");
            setNewMaterialTitle("");
            setNewMaterialDescription("");
            setNewMaterialUrl("");
            setNewMaterialFile(null);
            if (materialFileInputRef.current) {
                materialFileInputRef.current.value = "";
            }
            setNewMaterialType("video");
            await fetchTutorData();
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsCreatingMaterial(false);
        }
    }
    useEffect(() => {
        void fetchTutorData();
    }, [user?.id]);
    const publishedCourses = useMemo(() => courses.filter((course) => course.status === "published").length, [courses]);
    if (isLoading) {
        return (_jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: _jsx(Spinner, { size: "lg" }) }));
    }
    if (errorMessage) {
        return _jsx(ErrorState, { message: errorMessage, onRetry: fetchTutorData });
    }
    return (_jsxs("div", { className: "min-h-screen bg-background-light", children: [_jsx(Topbar, { title: "Tutor Dashboard", subtitle: "Manage your courses and update course resources" }), _jsx("main", { className: "px-6 py-8 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-7xl space-y-8", children: [actionMessage ? (_jsx("div", { className: "rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700", children: actionMessage })) : null, _jsxs("section", { className: "grid gap-6 sm:grid-cols-2 xl:grid-cols-3", children: [_jsx(StatCard, { label: "My courses", value: courses.length, icon: _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }) }), _jsx(StatCard, { label: "Published courses", value: publishedCourses, icon: _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }), _jsx(StatCard, { label: "Total materials", value: materialCount, icon: _jsx("svg", { className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" }) }) })] }), _jsxs("section", { className: "grid gap-8 lg:grid-cols-2", children: [_jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-soft", children: [_jsx("h2", { className: "text-xl font-semibold text-text-primary", children: "Create new course" }), _jsxs("form", { className: "mt-6 space-y-4", onSubmit: handleCreateCourse, children: [_jsx(InputField, { id: "courseTitle", label: "Course title", value: newCourseTitle, onChange: (event) => setNewCourseTitle(event.target.value), required: true }), _jsx(InputField, { id: "courseDescription", label: "Description", value: newCourseDescription, onChange: (event) => setNewCourseDescription(event.target.value), required: true }), _jsx(InputField, { id: "courseCategory", label: "Category", value: newCourseCategory, onChange: (event) => setNewCourseCategory(event.target.value) }), _jsx(SelectField, { id: "courseLevel", label: "Level", value: newCourseLevel, onChange: (event) => setNewCourseLevel(event.target.value), options: [
                                                        { value: "beginner", label: "Beginner" },
                                                        { value: "intermediate", label: "Intermediate" },
                                                        { value: "advanced", label: "Advanced" }
                                                    ] }), _jsx(Button, { type: "submit", disabled: isCreatingCourse, className: "w-full", children: isCreatingCourse ? "Creating..." : "Create course" })] })] }), _jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-soft", children: [_jsx("h2", { className: "text-xl font-semibold text-text-primary", children: "Upload material" }), _jsxs("form", { className: "mt-6 space-y-4", onSubmit: handleCreateMaterial, children: [_jsx(SelectField, { id: "materialCourse", label: "Course", value: newMaterialCourseId, onChange: (event) => setNewMaterialCourseId(event.target.value), options: courses.length > 0
                                                        ? courses.map((course) => ({ value: String(course.id), label: course.title }))
                                                        : [{ value: "", label: "No courses available" }] }), _jsx(InputField, { id: "materialTitle", label: "Material title", value: newMaterialTitle, onChange: (event) => setNewMaterialTitle(event.target.value), required: true }), _jsx(SelectField, { id: "materialType", label: "Material type", value: newMaterialType, onChange: (event) => setNewMaterialType(event.target.value), options: [
                                                        { value: "video", label: "Video" },
                                                        { value: "pdf", label: "PDF" },
                                                        { value: "link", label: "External link" }
                                                    ] }), (newMaterialType === "video" || newMaterialType === "pdf") && (_jsxs("div", { className: "space-y-3", children: [_jsx(InputField, { id: "materialFile", label: newMaterialType === "pdf" ? "Upload PDF" : "Upload video file", type: "file", accept: newMaterialType === "pdf" ? "application/pdf" : "video/*", ref: materialFileInputRef, onChange: (event) => setNewMaterialFile(event.target.files?.[0] ?? null) }), _jsx("p", { className: "text-sm text-text-secondary", children: "Upload a file or provide a remote URL. If both are provided, uploaded file will be used." })] })), _jsx(InputField, { id: "materialUrl", label: newMaterialType === "link"
                                                        ? "External link"
                                                        : newMaterialType === "pdf"
                                                            ? "Remote PDF URL"
                                                            : "Remote video URL", value: newMaterialUrl, onChange: (event) => setNewMaterialUrl(event.target.value), placeholder: newMaterialType === "link" ? "https://..." : "https://...", required: newMaterialType === "link" }), _jsx(InputField, { id: "materialDescription", label: "Description", value: newMaterialDescription, onChange: (event) => setNewMaterialDescription(event.target.value) }), _jsx(Button, { type: "submit", disabled: isCreatingMaterial || courses.length === 0, className: "w-full", children: isCreatingMaterial ? "Uploading..." : "Upload material" })] })] })] }), _jsxs("section", { className: "space-y-6", children: [_jsx("h2", { className: "text-2xl font-semibold text-text-primary", children: "Managed courses" }), courses.length === 0 ? (_jsx(EmptyState, { title: "No tutor courses yet", message: "Once courses are assigned or created, they will appear here.", actionLabel: "Reload", onAction: fetchTutorData })) : (_jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: courses.map((course) => (_jsx(CourseCard, { course: course }, course.id))) }))] })] }) })] }));
}
export default TutorDashboardPage;
