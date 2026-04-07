import type { Material, MaterialType } from "@/types/material";
export declare function resolveMaterialUrl(material: Material): string;
export declare function toEmbeddedVideoUrl(rawUrl: string): string;
export declare function groupMaterialsByType(materials: Material[]): Record<MaterialType, Material[]>;
