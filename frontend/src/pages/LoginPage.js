import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "@/components/common/AuthShell";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { extractApiError } from "@/utils/api";
function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);
        try {
            await login({ email, password });
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (_jsx(AuthShell, { title: "Welcome back", subtitle: "Sign in to continue learning or managing courses.", children: _jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [_jsx(InputField, { id: "email", label: "Email", type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true, autoComplete: "email" }), _jsx(InputField, { id: "password", label: "Password", type: "password", value: password, onChange: (event) => setPassword(event.target.value), required: true, autoComplete: "current-password" }), errorMessage ? _jsx("p", { className: "rounded-lg bg-red-50 p-2 text-sm text-red-700", children: errorMessage }) : null, _jsx(Button, { type: "submit", fullWidth: true, disabled: isSubmitting, children: isSubmitting ? (_jsxs("span", { className: "inline-flex items-center gap-2", children: [_jsx(Spinner, { size: "sm", className: "border-white/40 border-t-white" }), "Signing in..."] })) : ("Login") }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx(Link, { to: "/forgot-password", className: "text-brand-700 hover:text-brand-800", children: "Forgot password?" }), _jsx(Link, { to: "/signup", className: "text-slate-600 hover:text-slate-800", children: "Create account" })] })] }) }));
}
export default LoginPage;
