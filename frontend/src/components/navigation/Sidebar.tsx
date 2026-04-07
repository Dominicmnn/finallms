import { Link, NavLink } from "react-router-dom";
import type { NavItem } from "@/utils/role";
import { cn } from "@/utils/cn";

interface SidebarProps {
  navItems: NavItem[];
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

function Sidebar({ navItems, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <aside className="hidden w-64 border-r border-slate-200 bg-background-light px-6 py-6 md:block">
        <SidebarContent navItems={navItems} onNavigate={onCloseMobile} />
      </aside>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-900/40 transition md:hidden",
          mobileOpen ? "visible opacity-100" : "invisible opacity-0"
        )}
        onClick={onCloseMobile}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-background-light px-6 py-6 transition-transform md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent navItems={navItems} onNavigate={onCloseMobile} />
      </aside>
    </>
  );
}

function SidebarContent({ navItems, onNavigate }: { navItems: NavItem[]; onNavigate: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link
        to="/dashboard"
        className="inline-flex items-center text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-500 bg-clip-text text-transparent hover:from-primary-700 hover:to-accent-600 transition-all duration-300"
        onClick={onNavigate}
      >
        NEBULA
      </Link>
      <nav className="mt-10 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                "block rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-soft"
                  : "text-text-secondary hover:bg-primary-50 hover:text-primary-700"
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
