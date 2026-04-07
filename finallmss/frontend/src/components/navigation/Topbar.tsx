import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface TopbarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

function Topbar({ title, subtitle, actions }: TopbarProps) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-background-light/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-6">
        <div>
          <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
          {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4">
          {actions}
          {/* Notifications placeholder */}
          <button className="rounded-xl p-2 text-text-secondary hover:bg-primary-50 hover:text-primary-700 transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 012 21h13.5M12 2.25c.414 0 .75.336.75.75v2.25a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75V3c0-.414.336-.75.75-.75h3zm-4.5 3.75a.75.75 0 01-.75-.75V3c0-.414.336-.75.75-.75h.75c.414 0 .75.336.75.75v2.25a.75.75 0 01-.75.75h-.75zm8.25-.75a.75.75 0 00-.75.75v2.25c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75h-.75z" />
            </svg>
          </button>

          {/* User profile dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-2 rounded-xl p-2 text-text-secondary hover:bg-primary-50 hover:text-primary-700 transition-colors">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </div>
              <span className="hidden sm:block text-sm font-medium">{user?.first_name} {user?.last_name}</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-soft-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-2">
                <Link
                  to="/profile"
                  className="block rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-primary-50 hover:text-primary-700 transition-colors"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left rounded-lg px-3 py-2 text-sm text-text-secondary hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
