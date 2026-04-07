import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaterialCard from "@/components/common/MaterialCard";
import Topbar from "@/components/navigation/Topbar";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { courseService } from "@/services/courseService";
import { materialService } from "@/services/materialService";
import { extractApiError } from "@/utils/api";
import { groupMaterialsByType } from "@/utils/material";
const sections = [
    { key: "video", title: "Video lessons", description: "Watch lectures and tutorial videos." },
    { key: "pdf", title: "PDF documents", description: "Read notes and downloadable course files." },
    { key: "link", title: "External links", description: "Open related resources in a new tab." }
];
function MaterialsPage() {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [materials, setMaterials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    async function fetchMaterials() {
        setIsLoading(true);
        setErrorMessage("");
        try {
            if (courseId) {
                const [courseData, materialsData] = await Promise.all([
                    courseService.getCourse(courseId),
                    materialService.listMaterials(courseId)
                ]);
                setCourse(courseData);
                setMaterials(materialsData.items);
            }
            else {
                const materialsData = await materialService.listMaterials();
                setCourse(null);
                setMaterials(materialsData.items);
            }
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        void fetchMaterials();
    }, [courseId]);
    if (isLoading) {
        return (_jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: _jsx(Spinner, { size: "lg" }) }));
    }
    if (errorMessage) {
        return _jsx(ErrorState, { message: errorMessage, onRetry: fetchMaterials });
    }
    if (courseId && !course) {
        return _jsx(EmptyState, { title: "Course not found", message: "Cannot load materials without a valid course." });
    }
    if (materials.length === 0) {
        return (_jsxs("div", { className: "min-h-screen bg-background-light", children: [_jsx(Topbar, { title: course ? `${course.title} materials` : "All materials", subtitle: "Videos, PDFs, and links are organized in this page." }), _jsx("main", { className: "px-6 py-8 lg:px-8", children: _jsx("div", { className: "mx-auto max-w-7xl", children: _jsx(EmptyState, { title: "No materials available", message: "This course has no published materials yet.", actionLabel: "Reload", onAction: fetchMaterials }) }) })] }));
    }
    const grouped = groupMaterialsByType(materials);
    return (_jsxs("div", { className: "min-h-screen bg-background-light", children: [_jsx(Topbar, { title: course ? `${course.title} materials` : "All materials", subtitle: "Learn using all course resources grouped by format." }), _jsx("main", { className: "px-6 py-8 lg:px-8", children: _jsx("div", { className: "mx-auto max-w-7xl space-y-8", children: sections.map((section) => (_jsxs("section", { className: "space-y-6", children: [_jsxs("div", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-soft", children: [_jsx("h2", { className: "text-xl font-semibold text-text-primary", children: section.title }), _jsx("p", { className: "mt-2 text-sm text-text-secondary", children: section.description })] }), grouped[section.key].length === 0 ? (_jsxs("div", { className: "rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-text-secondary", children: ["No ", section.key, " materials yet."] })) : (_jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: grouped[section.key].map((material) => (_jsx(MaterialCard, { material: material }, material.id))) }))] }, section.key))) }) })] }));
}
export default MaterialsPage;
