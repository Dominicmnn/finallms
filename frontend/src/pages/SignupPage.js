import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "@/components/common/AuthShell";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { extractApiError } from "@/utils/api";
function SignupPage() {
    const { signup } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("student");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");
        if (password !== confirmPassword) {
            setErrorMessage("Password and confirmation do not match.");
            return;
        }
        if (role === "admin") {
            setErrorMessage("Admin account creation is restricted.");
            return;
        }
        setIsSubmitting(true);
        try {
            await signup({
                first_name: firstName,
                last_name: lastName,
                email,
                role: role,
                password
            });
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsSubmitting(false);
        }
    }
    return (_jsx(AuthShell, { title: "Create your account", subtitle: "Start as a student or tutor.", children: _jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [_jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [_jsx(InputField, { id: "firstName", label: "First name", value: firstName, onChange: (event) => setFirstName(event.target.value), required: true }), _jsx(InputField, { id: "lastName", label: "Last name", value: lastName, onChange: (event) => setLastName(event.target.value), required: true })] }), _jsx(InputField, { id: "email", label: "Email", type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true }), _jsx(SelectField, { id: "role", label: "Role", value: role, onChange: (event) => setRole(event.target.value), options: [
                        { label: "Student", value: "student" },
                        { label: "Tutor", value: "tutor" }
                    ] }), _jsx(InputField, { id: "password", label: "Password", type: "password", value: password, onChange: (event) => setPassword(event.target.value), required: true }), _jsx(InputField, { id: "confirmPassword", label: "Confirm password", type: "password", value: confirmPassword, onChange: (event) => setConfirmPassword(event.target.value), required: true }), errorMessage ? _jsx("p", { className: "rounded-lg bg-red-50 p-2 text-sm text-red-700", children: errorMessage }) : null, _jsx(Button, { type: "submit", fullWidth: true, disabled: isSubmitting, children: isSubmitting ? (_jsxs("span", { className: "inline-flex items-center gap-2", children: [_jsx(Spinner, { size: "sm", className: "border-white/40 border-t-white" }), "Creating account..."] })) : ("Sign up") }), _jsxs("p", { className: "text-center text-sm text-slate-600", children: ["Already have an account?", " ", _jsx(Link, { to: "/login", className: "font-medium text-brand-700 hover:text-brand-800", children: "Login" })] })] }) }));
}
export default SignupPage;
