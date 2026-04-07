import type { ButtonHTMLAttributes } from "react";
type ButtonVariant = "primary" | "secondary" | "outline" | "danger";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    fullWidth?: boolean;
}
declare function Button({ children, className, variant, fullWidth, disabled, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export default Button;
