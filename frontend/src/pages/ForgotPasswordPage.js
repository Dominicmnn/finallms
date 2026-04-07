import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "@/components/common/AuthShell";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { authService } from "@/services/authService";
import { extractApiError } from "@/utils/api";
function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");
        setMessage("");
        setIsSubmitting(true);
        try {
            const response = await authService.forgotPassword({ email });
            setMessage(response.detail || "If your email exists in the system, password reset instructions were sent.");
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (_jsx(AuthShell, { title: "Reset password", subtitle: "Enter your email and we will send reset instructions.", children: _jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [_jsx(InputField, { id: "email", label: "Email", type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true }), message ? _jsx("p", { className: "rounded-lg bg-emerald-50 p-2 text-sm text-emerald-800", children: message }) : null, errorMessage ? _jsx("p", { className: "rounded-lg bg-red-50 p-2 text-sm text-red-700", children: errorMessage }) : null, _jsx(Button, { type: "submit", fullWidth: true, disabled: isSubmitting, children: isSubmitting ? "Sending..." : "Send reset link" }), _jsxs("p", { className: "text-center text-sm text-slate-600", children: ["Back to", " ", _jsx(Link, { to: "/login", className: "font-medium text-brand-700 hover:text-brand-800", children: "login" })] })] }) }));
}
export default ForgotPasswordPage;
