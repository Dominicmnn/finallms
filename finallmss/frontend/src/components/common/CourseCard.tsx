import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-200 hover:shadow-soft-lg hover:scale-[1.02]">
      <div className="flex flex-wrap items-center gap-2">
        {course.level ? <Badge label={course.level} tone="info" /> : null}
        {course.status ? (
          <Badge label={course.status} tone={course.status === "published" ? "success" : "warning"} />
        ) : null}
      </div>

      <h3 className="mt-4 text-xl font-semibold text-text-primary">{course.title}</h3>
      <p className="mt-3 text-sm text-text-secondary">{course.description}</p>

      <div className="mt-6 space-y-2 text-sm text-text-secondary">
        <p>Category: {course.category || "General"}</p>
        <p>Tutor: {course.tutor ? `${course.tutor.first_name} ${course.tutor.last_name}` : "TBD"}</p>
        <p>Enrollment: {course.enrollment_count ?? 0}</p>
      </div>

      <div className="mt-8 flex gap-3">
        <Link to={`/courses/${course.id}`} className="flex-1">
          <Button fullWidth>View course</Button>
        </Link>
        <Link to={`/courses/${course.id}/materials`} className="flex-1">
          <Button variant="outline" fullWidth>
            Materials
          </Button>
        </Link>
      </div>
    </article>
  );
}

export default CourseCard;
