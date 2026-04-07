import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Topbar from "@/components/navigation/Topbar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { courseService } from "@/services/courseService";
import { materialService } from "@/services/materialService";
import type { Course } from "@/types/course";
import type { Material } from "@/types/material";
import { extractApiError } from "@/utils/api";

function CourseDetailsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchCourseDetails() {
    if (!courseId) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const [courseData, materialsData] = await Promise.all([
        courseService.getCourse(courseId),
        materialService.listMaterials(courseId)
      ]);
      setCourse(courseData);
      setMaterials(materialsData.items);
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void fetchCourseDetails();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (errorMessage) {
    return <ErrorState message={errorMessage} onRetry={fetchCourseDetails} />;
  }

  if (!course) {
    return <EmptyState title="Course not found" message="This course does not exist or is unavailable." />;
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Topbar
        title={course.title}
        subtitle={course.description}
        actions={
          <Link to={`/courses/${course.id}/materials`}>
            <Button>Open materials</Button>
          </Link>
        }
      />
      <main className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-xs uppercase tracking-wide text-text-secondary">Category</p>
              <p className="mt-2 text-lg font-semibold text-text-primary">{course.category || "General"}</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-xs uppercase tracking-wide text-text-secondary">Level</p>
              <div className="mt-2">
                <Badge label={course.level || "unspecified"} tone="info" />
              </div>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-xs uppercase tracking-wide text-text-secondary">Status</p>
              <div className="mt-2">
                <Badge
                  label={course.status || "unknown"}
                  tone={course.status === "published" ? "success" : "warning"}
                />
              </div>
            </article>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
              <p className="text-xs uppercase tracking-wide text-text-secondary">Enrollment</p>
              <p className="mt-2 text-lg font-semibold text-text-primary">{course.enrollment_count ?? 0}</p>
            </article>
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-soft">
              <h2 className="text-xl font-semibold text-text-primary">Recent materials</h2>
              {materials.length === 0 ? (
                <p className="mt-4 text-sm text-text-secondary">No materials added yet.</p>
              ) : (
                <ul className="mt-6 space-y-4">
                  {materials.slice(0, 5).map((material) => (
                    <li key={material.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-4 transition-colors duration-200 hover:bg-slate-100">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{material.title}</p>
                        <p className="text-xs text-text-secondary">{material.type}</p>
                      </div>
                      <Link className="text-sm font-semibold text-primary-600 hover:text-primary-700" to={`/materials/${material.id}`}>
                        Open
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-soft">
              <h2 className="text-xl font-semibold text-text-primary">Enrolled students</h2>
              {course.enrolled_students && course.enrolled_students.length > 0 ? (
                <ul className="mt-6 space-y-3">
                  {course.enrolled_students.map((student) => (
                    <li key={student.id} className="rounded-xl bg-slate-50 p-4">
                      <p className="text-sm font-medium text-text-primary">
                        {student.first_name} {student.last_name}
                      </p>
                      <p className="text-xs text-text-secondary">{student.email}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-text-secondary">No enrolled student details were returned by the API.</p>
              )}
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}

export default CourseDetailsPage;
