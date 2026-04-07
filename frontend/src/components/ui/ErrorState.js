import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Button from "@/components/ui/Button";
function ErrorState({ title = "Unable to load data", message, onRetry }) {
    return (_jsxs("div", { className: "rounded-xl border border-red-200 bg-red-50 p-6 text-red-900 shadow-sm", children: [_jsx("h3", { className: "text-lg font-semibold", children: title }), _jsx("p", { className: "mt-1 text-sm", children: message }), onRetry ? (_jsx("div", { className: "mt-4", children: _jsx(Button, { variant: "danger", onClick: onRetry, children: "Retry" }) })) : null] }));
}
export default ErrorState;
