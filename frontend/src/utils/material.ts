import type { Material, MaterialType } from "@/types/material";

export function resolveMaterialUrl(material: Material): string {
  return material.file || material.file_url || material.url || material.external_url || "";
}

export function toEmbeddedVideoUrl(rawUrl: string): string {
  try {
    const url = new URL(rawUrl);

    if (url.hostname.includes("youtube.com")) {
      const videoId = url.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    if (url.hostname.includes("youtu.be")) {
      const videoId = url.pathname.replace("/", "");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    if (url.hostname.includes("vimeo.com")) {
      const videoId = url.pathname.replace("/", "");
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    }
  } catch {
    return rawUrl;
  }

  return rawUrl;
}

export function groupMaterialsByType(materials: Material[]): Record<MaterialType, Material[]> {
  return materials.reduce<Record<MaterialType, Material[]>>(
    (acc, material) => {
      acc[material.type].push(material);
      return acc;
    },
    {
      video: [],
      pdf: [],
      link: []
    }
  );
}
