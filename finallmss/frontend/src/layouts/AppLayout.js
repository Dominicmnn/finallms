import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/navigation/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { getNavItemsByRole } from "@/utils/role";
function AppLayout() {
    const { user } = useAuth();
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    return (_jsxs("div", { className: "min-h-screen md:flex", children: [_jsx(Sidebar, { navItems: getNavItemsByRole(user?.role), mobileOpen: mobileSidebarOpen, onCloseMobile: () => setMobileSidebarOpen(false) }), _jsx("div", { className: "flex min-h-screen flex-1 flex-col", children: _jsx("main", { className: "flex-1", children: _jsx(Outlet, {}) }) })] }));
}
export default AppLayout;
