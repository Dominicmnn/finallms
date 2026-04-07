import { useEffect, useMemo, useState } from "react";
import CourseCard from "@/components/common/CourseCard";
import Topbar from "@/components/navigation/Topbar";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Spinner from "@/components/ui/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { courseService } from "@/services/courseService";
import type { Course, CourseLevel } from "@/types/course";
import { extractApiError } from "@/utils/api";

function CoursesListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<CourseLevel | "">("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const categoryOptions = useMemo(
    () => [
      { value: "", label: "All levels" },
      { value: "beginner", label: "Beginner" },
      { value: "intermediate", label: "Intermediate" },
      { value: "advanced", label: "Advanced" }
    ],
    []
  );

  async function fetchCourses() {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await courseService.listCourses({
        search: debouncedSearch || undefined,
        level
      });
      setCourses(response.items);
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void fetchCourses();
  }, [debouncedSearch, level]);

  return (
    <div className="min-h-screen bg-background-light">
      <Topbar
        title="Courses"
        subtitle="Browse enrolled or available courses, and filter what you need quickly."
      />
      <main className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="grid gap-6 md:grid-cols-2">
              <InputField
                id="courseSearch"
                label="Search courses"
                placeholder="Search by course title or description..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <SelectField
                id="courseLevel"
                label="Filter by level"
                value={level}
                onChange={(event) => setLevel(event.target.value as CourseLevel | "")}
                options={categoryOptions}
              />
            </div>
          </section>

          {isLoading ? (
            <div className="flex min-h-[30vh] items-center justify-center">
              <Spinner size="lg" />
            </div>
          ) : null}

          {!isLoading && errorMessage ? <ErrorState message={errorMessage} onRetry={fetchCourses} /> : null}

          {!isLoading && !errorMessage && courses.length === 0 ? (
            <EmptyState
              title="No courses found"
              message="Try adjusting search terms or filters to find courses."
              actionLabel="Reset search"
              onAction={() => {
                setSearch("");
                setLevel("");
              }}
            />
          ) : null}

          {!isLoading && !errorMessage && courses.length > 0 ? (
            <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default CoursesListPage;
