interface StatCardProps {
    label: string;
    value: string | number;
    hint?: string;
    icon?: React.ReactNode;
}
declare function StatCard({ label, value, hint, icon }: StatCardProps): import("react/jsx-runtime").JSX.Element;
export default StatCard;
