import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  wrapperClassName?: string;
}

function InputField(
  { label, id, error, className, wrapperClassName, ...props }: InputFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={cn("space-y-1", wrapperClassName)}>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className={cn(
          "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200",
          error && "border-red-400 focus:border-red-400 focus:ring-red-200",
          className
        )}
        {...props}
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

export default forwardRef<HTMLInputElement, InputFieldProps>(InputField);
