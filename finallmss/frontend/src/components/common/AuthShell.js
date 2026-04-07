import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import logo from "@/assets/lms-logo.svg";
function AuthShell({ title, subtitle, children }) {
    return (_jsx("main", { className: "grid min-h-screen place-items-center px-4 py-10", children: _jsxs("section", { className: "w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur", children: [_jsxs("div", { className: "mb-6", children: [_jsx(Link, { to: "/", className: "inline-block", children: _jsx("img", { src: logo, alt: "LMS logo", className: "h-10 w-auto" }) }), _jsx("h1", { className: "mt-4 text-2xl font-bold text-slate-900", children: title }), _jsx("p", { className: "mt-1 text-sm text-slate-600", children: subtitle })] }), children] }) }));
}
export default AuthShell;
