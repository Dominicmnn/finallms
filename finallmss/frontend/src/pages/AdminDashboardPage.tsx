import { useEffect, useState } from "react";
import Topbar from "@/components/navigation/Topbar";
import StatCard from "@/components/common/StatCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { courseService } from "@/services/courseService";
import { materialService } from "@/services/materialService";
import { userService } from "@/services/userService";
import type { Course } from "@/types/course";
import type { Material } from "@/types/material";
import type { User } from "@/types/user";
import { extractApiError } from "@/utils/api";

function AdminDashboardPage() {
  const [stats, setStats] = useState({ users: 0, courses: 0, materials: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [busyActionKey, setBusyActionKey] = useState("");

  async function fetchAdminData() {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const [users, courses, materials] = await Promise.all([
        userService.listUsers({ ordering: "-id" }),
        courseService.listCourses(),
        materialService.listMaterials()
      ]);

      setStats({
        users: users.count,
        courses: courses.count,
        materials: materials.count
      });
      setUsers(users.items.slice(0, 8));
      setCourses(courses.items.slice(0, 8));
      setMaterials(materials.items.slice(0, 8));
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleToggleUser(user: User) {
    setBusyActionKey(`user-${user.id}`);
    setActionMessage("");
    try {
      await userService.updateUser(user.id, { is_active: !user.is_active });
      setActionMessage("User status updated.");
      await fetchAdminData();
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setBusyActionKey("");
    }
  }

  async function handleDeleteCourse(courseId: number) {
    if (!window.confirm("Delete this course?")) {
      return;
    }
    setBusyActionKey(`course-${courseId}`);
    setActionMessage("");
    try {
      await courseService.deleteCourse(courseId);
      setActionMessage("Course deleted.");
      await fetchAdminData();
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setBusyActionKey("");
    }
  }

  async function handleDeleteMaterial(materialId: number) {
    if (!window.confirm("Delete this material?")) {
      return;
    }
    setBusyActionKey(`material-${materialId}`);
    setActionMessage("");
    try {
      await materialService.deleteMaterial(materialId);
      setActionMessage("Material deleted.");
      await fetchAdminData();
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setBusyActionKey("");
    }
  }

  useEffect(() => {
    void fetchAdminData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (errorMessage) {
    return <ErrorState message={errorMessage} onRetry={fetchAdminData} />;
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Topbar
        title="Admin Dashboard"
        subtitle="Manage users, course catalog, and platform content quality."
      />
      <main className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="Total users"
              value={stats.users}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              }
            />
            <StatCard
              label="Total courses"
              value={stats.courses}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
            />
            <StatCard
              label="Total materials"
              value={stats.materials}
              icon={
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              }
            />
          </section>
          {actionMessage ? (
            <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
              {actionMessage}
            </div>
          ) : null}

          <section className="grid gap-8 xl:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-soft">
              <h2 className="text-xl font-semibold text-text-primary">Users</h2>
              {users.length === 0 ? (
                <p className="mt-4 text-sm text-text-secondary">No users returned by the API yet.</p>
              ) : (
                <ul className="mt-6 space-y-4">
                  {users.map((user) => (
                    <li key={user.id} className="rounded-xl bg-slate-50 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-xs text-text-secondary">{user.email}</p>
                        </div>
                        <Badge label={user.role} tone="info" />
                      </div>
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          disabled={busyActionKey === `user-${user.id}`}
                          onClick={() => void handleToggleUser(user)}
                          className="w-full"
                        >
                          {user.is_active === false ? "Activate" : "Deactivate"}
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-soft">
              <h2 className="text-xl font-semibold text-text-primary">Courses</h2>
              {courses.length === 0 ? (
                <p className="mt-4 text-sm text-text-secondary">No courses available.</p>
              ) : (
                <ul className="mt-6 space-y-4">
                  {courses.map((course) => (
                    <li key={course.id} className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm font-medium text-text-primary">{course.title}</p>
                      <p className="text-xs text-text-secondary">{course.category || "General"}</p>
                      <div className="mt-4">
                        <Button
                          variant="danger"
                          disabled={busyActionKey === `course-${course.id}`}
                          onClick={() => void handleDeleteCourse(course.id)}
                          className="w-full"
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-soft">
              <h2 className="text-xl font-semibold text-text-primary">Materials</h2>
              {materials.length === 0 ? (
                <p className="mt-4 text-sm text-text-secondary">No materials available.</p>
              ) : (
                <ul className="mt-6 space-y-4">
                  {materials.map((material) => (
                    <li key={material.id} className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm font-medium text-text-primary">{material.title}</p>
                      <p className="text-xs text-text-secondary">{material.type}</p>
                      <div className="mt-4">
                        <Button
                          variant="danger"
                          disabled={busyActionKey === `material-${material.id}`}
                          onClick={() => void handleDeleteMaterial(material.id)}
                          className="w-full"
                        >
                          Delete
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboardPage;
