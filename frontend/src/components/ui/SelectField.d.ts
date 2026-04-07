import type { SelectHTMLAttributes } from "react";
interface Option {
    label: string;
    value: string;
}
interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: Option[];
    error?: string;
    wrapperClassName?: string;
}
declare function SelectField({ label, options, id, error, className, wrapperClassName, ...props }: SelectFieldProps): import("react/jsx-runtime").JSX.Element;
export default SelectField;
