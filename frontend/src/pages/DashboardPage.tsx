import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Topbar from "@/components/navigation/Topbar";
import StatCard from "@/components/common/StatCard";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Spinner from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { courseService } from "@/services/courseService";
import { materialService } from "@/services/materialService";
import { userService } from "@/services/userService";
import { extractApiError } from "@/utils/api";
import { getDefaultRouteByRole } from "@/utils/role";

interface DashboardStats {
  courses: number;
  materials: number;
  users: number;
}

function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchData() {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const [courses, materials, users] = await Promise.all([
        courseService.listCourses(),
        materialService.listMaterials(),
        user?.role === "admin" ? userService.listUsers() : Promise.resolve({ items: [], count: 0 })
      ]);

      setStats({
        courses: courses.count,
        materials: materials.count,
        users: users.count
      });
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void fetchData();
  }, [user?.role]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-light">
        <Spinner size="lg" />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-background-light">
        <Topbar title="Dashboard" subtitle="A quick view of your NEBULA workspace." />
        <ErrorState message={errorMessage} onRetry={fetchData} />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-background-light">
        <Topbar title="Dashboard" subtitle="A quick view of your NEBULA workspace." />
        <EmptyState
          title="No dashboard data"
          message="No data could be loaded for your workspace."
          actionLabel="Retry"
          onAction={fetchData}
        />
      </div>
    );
  }

  const roleRoute = getDefaultRouteByRole(user?.role);

  return (
    <div className="min-h-screen bg-background-light">
      <Topbar title="Dashboard" subtitle="A quick view of your NEBULA workspace." />

      <main className="px-6 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Stats Grid */}
          <section className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              label="Total Courses"
              value={stats.courses}
              hint="Across all visible courses"
              icon={
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
            <StatCard
              label="Total Materials"
              value={stats.materials}
              hint="Videos, PDFs, and links"
              icon={
                <svg className="h-6 w-6 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-9 0V1m10 3V1m0 3l1 1v16a2 2 0 01-2 2H6a2 2 0 01-2-2V5l1-1z" />
                </svg>
              }
            />
            <StatCard
              label="Total Users"
              value={user?.role === "admin" ? stats.users : "--"}
              hint="Admin view only"
              icon={
                <svg className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              }
            />
          </section>

          {/* Recent Activity Section */}
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Recent Activity</h2>
              <Link
                to={roleRoute}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                View all →
              </Link>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="rounded-full bg-primary-100 p-2">
                  <svg className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">New course material uploaded</p>
                  <p className="text-xs text-text-secondary">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="rounded-full bg-accent-100 p-2">
                  <svg className="h-4 w-4 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">New student enrolled</p>
                  <p className="text-xs text-text-secondary">1 day ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="rounded-full bg-primary-100 p-2">
                  <svg className="h-4 w-4 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">Course completed</p>
                  <p className="text-xs text-text-secondary">3 days ago</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
