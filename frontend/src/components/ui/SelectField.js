import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/utils/cn";
function SelectField({ label, options, id, error, className, wrapperClassName, ...props }) {
    return (_jsxs("div", { className: cn("space-y-1", wrapperClassName), children: [_jsx("label", { htmlFor: id, className: "block text-sm font-medium text-slate-700", children: label }), _jsx("select", { id: id, className: cn("w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200", error && "border-red-400 focus:border-red-400 focus:ring-red-200", className), ...props, children: options.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) }), error ? _jsx("p", { className: "text-xs text-red-600", children: error }) : null] }));
}
export default SelectField;
