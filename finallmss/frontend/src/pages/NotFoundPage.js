import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
function NotFoundPage() {
    return (_jsx("main", { className: "grid min-h-screen place-items-center px-4", children: _jsxs("section", { className: "w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft", children: [_jsx("p", { className: "text-sm font-semibold uppercase tracking-[0.3em] text-brand-700", children: "404" }), _jsx("h1", { className: "mt-2 text-3xl font-bold text-slate-900", children: "Page not found" }), _jsx("p", { className: "mt-2 text-sm text-slate-600", children: "The page you are looking for does not exist or has been moved." }), _jsxs("div", { className: "mt-5 flex justify-center gap-2", children: [_jsx(Link, { to: "/dashboard", children: _jsx(Button, { children: "Go to dashboard" }) }), _jsx(Link, { to: "/", children: _jsx(Button, { variant: "outline", children: "Home" }) })] })] }) }));
}
export default NotFoundPage;
