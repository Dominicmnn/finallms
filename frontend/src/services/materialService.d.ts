import type { ListResponse } from "@/types/api";
import type { Material, MaterialPayload } from "@/types/material";
export declare const materialService: {
    listMaterials(courseId?: number | string): Promise<ListResponse<Material>>;
    getMaterial(materialId: number | string): Promise<Material>;
    createMaterial(payload: MaterialPayload | FormData): Promise<Material>;
    updateMaterial(materialId: number | string, payload: Partial<MaterialPayload> | FormData): Promise<Material>;
    deleteMaterial(materialId: number | string): Promise<void>;
};
