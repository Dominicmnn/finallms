export function getDefaultRouteByRole(role) {
    switch (role) {
        case "admin":
            return "/admin";
        case "tutor":
            return "/tutor";
        case "student":
            return "/student";
        default:
            return "/dashboard";
    }
}
export function getNavItemsByRole(role) {
    const common = [
        { label: "Dashboard", to: "/dashboard" },
        { label: "Courses", to: "/courses" },
        { label: "Materials", to: "/materials" },
        { label: "Profile", to: "/profile" }
    ];
    if (role === "admin") {
        return [{ label: "Admin", to: "/admin" }, ...common];
    }
    if (role === "tutor") {
        return [{ label: "Tutor", to: "/tutor" }, ...common];
    }
    return [{ label: "Student", to: "/student" }, ...common];
}
export function roleLabel(role) {
    if (!role) {
        return "User";
    }
    return role.charAt(0).toUpperCase() + role.slice(1);
}
