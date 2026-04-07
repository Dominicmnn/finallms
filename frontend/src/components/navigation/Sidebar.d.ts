import type { NavItem } from "@/utils/role";
interface SidebarProps {
    navItems: NavItem[];
    mobileOpen: boolean;
    onCloseMobile: () => void;
}
declare function Sidebar({ navItems, mobileOpen, onCloseMobile }: SidebarProps): import("react/jsx-runtime").JSX.Element;
export default Sidebar;
