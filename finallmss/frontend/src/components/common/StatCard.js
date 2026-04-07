import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function StatCard({ label, value, hint, icon }) {
    return (_jsx("article", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-soft hover:shadow-soft-lg transition-all duration-200 hover:scale-105", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-text-secondary", children: label }), _jsx("p", { className: "mt-2 text-3xl font-bold text-text-primary", children: value }), hint && _jsx("p", { className: "mt-2 text-xs text-text-secondary", children: hint })] }), icon && (_jsx("div", { className: "rounded-xl bg-gradient-to-r from-primary-100 to-accent-100 p-3", children: icon }))] }) }));
}
export default StatCard;
