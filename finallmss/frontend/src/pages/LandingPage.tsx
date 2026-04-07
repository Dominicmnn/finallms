import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import logo from "@/assets/lms-logo.svg";

function LandingPage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white/85 px-5 py-4 shadow-sm backdrop-blur">
          <img src={logo} alt="LMS logo" className="h-9 w-auto" />
          <div className="flex gap-2">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Create account</Button>
            </Link>
          </div>
        </header>

        <div className="mt-10 grid items-center gap-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-soft md:grid-cols-2 md:p-10">
          <div>
            <p className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
              Frontend for Django REST LMS
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
              Learn, teach, and manage courses in one clean workspace.
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Role-based dashboards for students, tutors, and admins, with course materials built for
              videos, PDFs, and external links.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/signup">
                <Button>Create your account</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline">Open dashboard</Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">Students</h3>
              <p className="mt-2 text-sm text-slate-600">
                Track enrolled courses and open materials in a focused learning view.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-semibold text-slate-900">Tutors</h3>
              <p className="mt-2 text-sm text-slate-600">
                Manage courses, organize materials, and monitor learner engagement.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:col-span-2">
              <h3 className="font-semibold text-slate-900">Admins</h3>
              <p className="mt-2 text-sm text-slate-600">
                Oversee users, courses, and material distribution from a centralized panel.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
