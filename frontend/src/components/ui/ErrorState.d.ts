interface ErrorStateProps {
    title?: string;
    message: string;
    onRetry?: () => void;
}
declare function ErrorState({ title, message, onRetry }: ErrorStateProps): import("react/jsx-runtime").JSX.Element;
export default ErrorState;
