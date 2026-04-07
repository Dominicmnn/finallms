import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Topbar from "@/components/navigation/Topbar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { materialService } from "@/services/materialService";
import { extractApiError } from "@/utils/api";
import { resolveMaterialUrl, toEmbeddedVideoUrl } from "@/utils/material";
function MaterialViewerPage() {
    const { materialId } = useParams();
    const [material, setMaterial] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    async function fetchMaterial() {
        if (!materialId) {
            return;
        }
        setIsLoading(true);
        setErrorMessage("");
        try {
            const data = await materialService.getMaterial(materialId);
            setMaterial(data);
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        void fetchMaterial();
    }, [materialId]);
    const rawUrl = useMemo(() => (material ? resolveMaterialUrl(material) : ""), [material]);
    const embeddedVideoUrl = useMemo(() => toEmbeddedVideoUrl(rawUrl), [rawUrl]);
    if (isLoading) {
        return (_jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: _jsx(Spinner, { size: "lg" }) }));
    }
    if (errorMessage) {
        return _jsx(ErrorState, { message: errorMessage, onRetry: fetchMaterial });
    }
    if (!material) {
        return _jsx(EmptyState, { title: "Material not found", message: "The requested material does not exist." });
    }
    if (!rawUrl) {
        return (_jsx(EmptyState, { title: "Material URL missing", message: "This material has no attached URL or file to display." }));
    }
    return (_jsxs("div", { className: "min-h-screen bg-background-light", children: [_jsx(Topbar, { title: material.title, subtitle: material.description || "View and study this course material.", actions: _jsx(Link, { to: `/courses/${material.course}/materials`, children: _jsx(Button, { variant: "outline", children: "Back to materials" }) }) }), _jsx("main", { className: "px-6 py-8 lg:px-8", children: _jsxs("div", { className: "mx-auto max-w-7xl space-y-8", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { label: material.type, tone: material.type === "video" ? "info" : "warning" }), _jsxs("span", { className: "text-sm text-text-secondary", children: ["Material ID: ", material.id] })] }), material.type === "video" ? (_jsx("section", { className: "overflow-hidden rounded-xl border border-slate-200 bg-black shadow-soft", children: _jsx("div", { className: "aspect-video", children: _jsx("iframe", { src: embeddedVideoUrl, title: material.title, className: "h-full w-full", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }) }) })) : null, material.type === "pdf" ? (_jsxs("section", { className: "space-y-6", children: [_jsx("div", { className: "h-[75vh] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft", children: _jsx("iframe", { src: rawUrl, title: material.title, className: "h-full w-full" }) }), _jsx("a", { href: rawUrl, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-text-primary shadow-soft transition-all duration-200 hover:bg-slate-50 hover:shadow-soft-lg", children: "Download PDF" })] })) : null, material.type === "link" ? (_jsxs("section", { className: "rounded-xl border border-slate-200 bg-white p-8 shadow-soft", children: [_jsx("p", { className: "text-base text-text-secondary", children: "This material is an external resource. Open it in a new browser tab." }), _jsx("a", { href: rawUrl, target: "_blank", rel: "noopener noreferrer", className: "mt-6 inline-flex items-center rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:shadow-soft-lg hover:scale-105", children: "Open external link" })] })) : null] }) })] }));
}
export default MaterialViewerPage;
