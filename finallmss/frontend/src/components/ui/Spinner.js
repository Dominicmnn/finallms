import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/utils/cn";
const sizeClassMap = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-10 w-10 border-[3px]"
};
function Spinner({ size = "md", className }) {
    return (_jsx("span", { className: cn("inline-block animate-spin rounded-full border-slate-300 border-t-brand-600", sizeClassMap[size], className), "aria-label": "loading" }));
}
export function FullPageSpinner() {
    return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-slate-50", children: _jsx(Spinner, { size: "lg" }) }));
}
export default Spinner;
