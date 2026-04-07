import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";
import ErrorState from "@/components/ui/ErrorState";
import InputField from "@/components/ui/InputField";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services/userService";
import { extractApiError } from "@/utils/api";
function ProfilePage() {
    const { user, refreshMe } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bio, setBio] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    useEffect(() => {
        if (!user) {
            return;
        }
        setFirstName(user.first_name || "");
        setLastName(user.last_name || "");
        setBio(user.bio || "");
        setPhoneNumber(user.phone_number || "");
        setAvatarUrl(user.avatar_url || "");
    }, [user]);
    async function handleRefresh() {
        setIsLoading(true);
        setErrorMessage("");
        try {
            await refreshMe();
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsLoading(false);
        }
    }
    async function handleSubmit(event) {
        event.preventDefault();
        setIsSaving(true);
        setErrorMessage("");
        setSuccessMessage("");
        try {
            await userService.updateMe({
                first_name: firstName,
                last_name: lastName,
                bio: bio || null,
                phone_number: phoneNumber || null,
                avatar_url: avatarUrl || null
            });
            await refreshMe();
            setSuccessMessage("Profile updated successfully.");
        }
        catch (error) {
            setErrorMessage(extractApiError(error));
        }
        finally {
            setIsSaving(false);
        }
    }
    if (isLoading) {
        return (_jsx("div", { className: "flex min-h-[40vh] items-center justify-center", children: _jsx(Spinner, { size: "lg" }) }));
    }
    if (!user) {
        return _jsx(ErrorState, { title: "User missing", message: "Unable to load profile. Please sign in again." });
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(PageHeader, { title: "Profile", subtitle: "Manage your account details used across the LMS.", actions: _jsx(Button, { variant: "outline", onClick: handleRefresh, children: "Refresh profile" }) }), _jsxs("section", { className: "rounded-xl border border-slate-200 bg-white p-6 shadow-sm", children: [_jsxs("div", { className: "mb-4", children: [_jsxs("p", { className: "text-sm font-semibold text-slate-900", children: [user.first_name, " ", user.last_name] }), _jsx("p", { className: "text-sm text-slate-600", children: user.email }), _jsx("p", { className: "text-xs uppercase tracking-wide text-brand-700", children: user.role })] }), _jsxs("form", { className: "space-y-4", onSubmit: handleSubmit, children: [_jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [_jsx(InputField, { id: "firstName", label: "First name", value: firstName, onChange: (event) => setFirstName(event.target.value), required: true }), _jsx(InputField, { id: "lastName", label: "Last name", value: lastName, onChange: (event) => setLastName(event.target.value), required: true })] }), _jsx(InputField, { id: "phoneNumber", label: "Phone number", value: phoneNumber, onChange: (event) => setPhoneNumber(event.target.value) }), _jsx(InputField, { id: "avatarUrl", label: "Avatar URL", value: avatarUrl, onChange: (event) => setAvatarUrl(event.target.value), placeholder: "https://..." }), _jsxs("div", { className: "space-y-1", children: [_jsx("label", { htmlFor: "bio", className: "block text-sm font-medium text-slate-700", children: "Bio" }), _jsx("textarea", { id: "bio", className: "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200", rows: 4, value: bio, onChange: (event) => setBio(event.target.value) })] }), successMessage ? (_jsx("p", { className: "rounded-lg bg-emerald-50 p-2 text-sm text-emerald-700", children: successMessage })) : null, errorMessage ? _jsx("p", { className: "rounded-lg bg-red-50 p-2 text-sm text-red-700", children: errorMessage }) : null, _jsx(Button, { type: "submit", disabled: isSaving, children: isSaving ? "Saving..." : "Save profile" })] })] })] }));
}
export default ProfilePage;
