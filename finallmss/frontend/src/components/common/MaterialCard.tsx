import { Link } from "react-router-dom";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { Material } from "@/types/material";

interface MaterialCardProps {
  material: Material;
}

function MaterialCard({ material }: MaterialCardProps) {
  const typeTone = material.type === "video" ? "info" : material.type === "pdf" ? "warning" : "success";

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-soft transition-all duration-200 hover:shadow-soft-lg hover:scale-[1.02]">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-text-primary">{material.title}</h3>
        <Badge label={material.type} tone={typeTone} />
      </div>

      {material.description ? (
        <p className="mt-3 text-sm text-text-secondary">{material.description}</p>
      ) : null}

      <div className="mt-6">
        <Link to={`/materials/${material.id}`}>
          <Button variant="outline" className="w-full">
            Open viewer
          </Button>
        </Link>
      </div>
    </article>
  );
}

export default MaterialCard;
