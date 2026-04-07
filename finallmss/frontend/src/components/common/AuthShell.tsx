import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/lms-logo.svg";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-soft backdrop-blur">
        <div className="mb-6">
          <Link to="/" className="inline-block">
            <img src={logo} alt="LMS logo" className="h-10 w-auto" />
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>

        {children}
      </section>
    </main>
  );
}

export default AuthShell;
