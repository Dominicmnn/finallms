import { cn } from "@/utils/cn";

interface BadgeProps {
  label: string;
  tone?: "default" | "success" | "warning" | "info";
}

const toneStyles = {
  default: "bg-slate-100 text-slate-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  info: "bg-primary-100 text-primary-700"
} as const;

function Badge({ label, tone = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        toneStyles[tone]
      )}
    >
      {label}
    </span>
  );
}

export default Badge;
