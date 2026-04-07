interface EmptyStateProps {
    title: string;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
}
declare function EmptyState({ title, message, actionLabel, onAction }: EmptyStateProps): import("react/jsx-runtime").JSX.Element;
export default EmptyState;
