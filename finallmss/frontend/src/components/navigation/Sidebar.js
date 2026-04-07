import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
function Sidebar({ navItems, mobileOpen, onCloseMobile }) {
    return (_jsxs(_Fragment, { children: [_jsx("aside", { className: "hidden w-64 border-r border-slate-200 bg-background-light px-6 py-6 md:block", children: _jsx(SidebarContent, { navItems: navItems, onNavigate: onCloseMobile }) }), _jsx("div", { className: cn("fixed inset-0 z-40 bg-slate-900/40 transition md:hidden", mobileOpen ? "visible opacity-100" : "invisible opacity-0"), onClick: onCloseMobile }), _jsx("aside", { className: cn("fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-background-light px-6 py-6 transition-transform md:hidden", mobileOpen ? "translate-x-0" : "-translate-x-full"), children: _jsx(SidebarContent, { navItems: navItems, onNavigate: onCloseMobile }) })] }));
}
function SidebarContent({ navItems, onNavigate }) {
    return (_jsxs("div", { className: "flex h-full flex-col", children: [_jsx(Link, { to: "/dashboard", className: "inline-flex items-center text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent hover:from-primary-700 hover:to-accent-600 transition-all duration-300", onClick: onNavigate, children: "NEBULA" }), _jsx("nav", { className: "mt-10 space-y-2", children: navItems.map((item) => (_jsx(NavLink, { to: item.to, onClick: onNavigate, className: ({ isActive }) => cn("block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200", isActive
                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft"
                        : "text-text-secondary hover:bg-primary-50 hover:text-primary-700"), children: item.label }, item.to))) })] }));
}
export default Sidebar;
