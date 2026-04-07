import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function PageHeader({ title, subtitle, actions }) {
    return (_jsxs("div", { className: "flex flex-col justify-between gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-end", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900", children: title }), subtitle ? _jsx("p", { className: "mt-1 text-sm text-slate-600", children: subtitle }) : null] }), actions ? _jsx("div", { className: "flex flex-wrap items-center gap-2", children: actions }) : null] }));
}
export default PageHeader;
