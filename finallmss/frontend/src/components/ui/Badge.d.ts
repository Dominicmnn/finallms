interface BadgeProps {
    label: string;
    tone?: "default" | "success" | "warning" | "info";
}
declare function Badge({ label, tone }: BadgeProps): import("react/jsx-runtime").JSX.Element;
export default Badge;
