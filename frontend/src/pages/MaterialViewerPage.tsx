import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Topbar from "@/components/navigation/Topbar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import Spinner from "@/components/ui/Spinner";
import { materialService } from "@/services/materialService";
import type { Material } from "@/types/material";
import { extractApiError } from "@/utils/api";
import { resolveMaterialUrl, toEmbeddedVideoUrl } from "@/utils/material";

function MaterialViewerPage() {
  const { materialId } = useParams<{ materialId: string }>();
  const [material, setMaterial] = useState<Material | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchMaterial() {
    if (!materialId) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    try {
      const data = await materialService.getMaterial(materialId);
      setMaterial(data);
    } catch (error) {
      setErrorMessage(extractApiError(error));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void fetchMaterial();
  }, [materialId]);

  const rawUrl = useMemo(() => (material ? resolveMaterialUrl(material) : ""), [material]);
  const embeddedVideoUrl = useMemo(() => toEmbeddedVideoUrl(rawUrl), [rawUrl]);

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (errorMessage) {
    return <ErrorState message={errorMessage} onRetry={fetchMaterial} />;
  }

  if (!material) {
    return <EmptyState title="Material not found" message="The requested material does not exist." />;
  }

  if (!rawUrl) {
    return (
      <EmptyState
        title="Material URL missing"
        message="This material has no attached URL or file to display."
      />
    );
  }

  return (
    <div className="min-h-screen bg-background-light">
      <Topbar
        title={material.title}
        subtitle={material.description || "View and study this course material."}
        actions={
          <Link to={`/courses/${material.course}/materials`}>
            <Button variant="outline">Back to materials</Button>
          </Link>
        }
      />
      <main className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex items-center gap-3">
            <Badge label={material.type} tone={material.type === "video" ? "info" : "warning"} />
            <span className="text-sm text-text-secondary">Material ID: {material.id}</span>
          </div>

          {material.type === "video" ? (
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-black shadow-soft">
              <div className="aspect-video">
                <iframe
                  src={embeddedVideoUrl}
                  title={material.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          ) : null}

          {material.type === "pdf" ? (
            <section className="space-y-6">
              <div className="h-[75vh] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft">
                <iframe src={rawUrl} title={material.title} className="h-full w-full" />
              </div>
              <a
                href={rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-text-primary shadow-soft transition-all duration-200 hover:bg-slate-50 hover:shadow-soft-lg"
              >
                Download PDF
              </a>
            </section>
          ) : null}

          {material.type === "link" ? (
            <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-soft">
              <p className="text-base text-text-secondary">
                This material is an external resource. Open it in a new browser tab.
              </p>
              <a
                href={rawUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:shadow-soft-lg hover:scale-105"
              >
                Open external link
              </a>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}

export default MaterialViewerPage;
