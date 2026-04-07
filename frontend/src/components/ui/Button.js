import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/utils/cn";
const variantClassMap = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-400 shadow-soft",
    secondary: "bg-gradient-to-r from-slate-600 to-slate-700 text-white hover:from-slate-700 hover:to-slate-800 focus:ring-slate-400 shadow-soft",
    outline: "border border-slate-300 bg-white text-text-primary hover:bg-primary-50 hover:border-primary-300 focus:ring-primary-400",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-400 shadow-soft"
};
function Button({ children, className, variant = "primary", fullWidth = false, disabled, ...props }) {
    return (_jsx("button", { className: cn("rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 transform hover:scale-105 active:scale-95", fullWidth && "w-full", variantClassMap[variant], className), disabled: disabled, ...props, children: children }));
}
export default Button;
