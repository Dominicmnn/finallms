import { type InputHTMLAttributes } from "react";
interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    wrapperClassName?: string;
}
declare const _default: import("react").ForwardRefExoticComponent<InputFieldProps & import("react").RefAttributes<HTMLInputElement>>;
export default _default;
