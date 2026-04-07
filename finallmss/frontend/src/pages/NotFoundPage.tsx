import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";

function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-700">404</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Page not found</h1>
        <p className="mt-2 text-sm text-slate-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Link to="/dashboard">
            <Button>Go to dashboard</Button>
          </Link>
          <Link to="/">
            <Button variant="outline">Home</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
