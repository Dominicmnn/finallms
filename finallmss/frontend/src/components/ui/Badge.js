import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/utils/cn";
const toneStyles = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    info: "bg-primary-100 text-primary-700"
};
function Badge({ label, tone = "default" }) {
    return (_jsx("span", { className: cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide", toneStyles[tone]), children: label }));
}
export default Badge;
