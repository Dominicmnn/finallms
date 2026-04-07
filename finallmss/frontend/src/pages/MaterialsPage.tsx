import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MaterialCard from "@/components/common/MaterialCard";
import Topbar from "@/components/navigation/Topbar";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { courseService } from "@/services/courseService";
import { materialService } from "@/services/materialService";
import type { Course } from "@/types/course";
import type { Material, MaterialType } from "@/types/material";
import { extractApiError } from "@/utils/api";
import { groupMaterialsByType } from "@/utils/material";

const sections: Array<{ key: MaterialType; title: string; description: string }> = [
  { key: "video", title: "Video lessons", description: "Watch lectures and tutorial videos." },
  { key: "pdf", title: "PDF documents", description: "Read notes and downloadable course files." },
  { key: "link", title: "External links", description: "Open related resources in a new tab." }
];

function MaterialsPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchMaterials() {
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (courseId) {
        const [courseData, materialsData] = await Promise.all([
          courseService.getCourse(courseId),
          materialService.listMaterials(courseId)
        ]);
        setCourse(courseData);
        setMaterials(materialsData.items);
      } else {
        const materialsData = await materialService.listMaterials();
        setCourse(null);
        setMaterials(materialsData.items);
      }
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void fetchMaterials();
  }, [courseId]);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (errorMessage) {
    return <ErrorState message={errorMessage} onRetry={fetchMaterials} />;
  }

  if (courseId && !course) {
    return <EmptyState title="Course not found" message="Cannot load materials without a valid course." />;
  }

  if (materials.length === 0) {
    return (
      <div className="min-h-screen bg-background-light">
        <Topbar
          title={course ? `${course.title} materials` : "All materials"}
          subtitle="Videos, PDFs, and links are organized in this page."
        />
        <main className="px-6 py-8 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <EmptyState
              title="No materials available"
              message="This course has no published materials yet."
              actionLabel="Reload"
              onAction={fetchMaterials}
            />
          </div>
        </main>
      </div>
    );
  }

  const grouped = groupMaterialsByType(materials);

  return (
    <div className="min-h-screen bg-background-light">
      <Topbar
        title={course ? `${course.title} materials` : "All materials"}
        subtitle="Learn using all course resources grouped by format."
      />
      <main className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {sections.map((section) => (
            <section key={section.key} className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
                <h2 className="text-xl font-semibold text-text-primary">{section.title}</h2>
                <p className="mt-2 text-sm text-text-secondary">{section.description}</p>
              </div>

              {grouped[section.key].length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-text-secondary">
                  No {section.key} materials yet.
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {grouped[section.key].map((material) => (
                    <MaterialCard key={material.id} material={material} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MaterialsPage;
