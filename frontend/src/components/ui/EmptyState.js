import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "@/components/ui/Button";
function EmptyState({ title, message, actionLabel, onAction }) {
    return (_jsxs("div", { className: "rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm", children: [_jsx("h3", { className: "text-lg font-semibold text-slate-800", children: title }), _jsx("p", { className: "mt-2 text-sm text-slate-600", children: message }), actionLabel && onAction ? (_jsx("div", { className: "mt-4", children: _jsx(Button, { variant: "outline", onClick: onAction, children: actionLabel }) })) : null] }));
}
export default EmptyState;
