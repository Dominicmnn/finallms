import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
function MaterialCard({ material }) {
    const typeTone = material.type === "video" ? "info" : material.type === "pdf" ? "warning" : "success";
    return (_jsxs("article", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-200 hover:shadow-soft-lg hover:scale-[1.02]", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsx("h3", { className: "text-lg font-semibold text-text-primary", children: material.title }), _jsx(Badge, { label: material.type, tone: typeTone })] }), material.description ? (_jsx("p", { className: "mt-3 text-sm text-text-secondary", children: material.description })) : null, _jsx("div", { className: "mt-6", children: _jsx(Link, { to: `/materials/${material.id}`, children: _jsx(Button, { variant: "outline", className: "w-full", children: "Open viewer" }) }) })] }));
}
export default MaterialCard;
