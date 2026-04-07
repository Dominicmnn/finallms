import api from "@/services/api";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { ListResponse } from "@/types/api";
import type { Material, MaterialPayload } from "@/types/material";
import { normalizeListResponse } from "@/utils/api";

export const materialService = {
  async listMaterials(courseId?: number | string): Promise<ListResponse<Material>> {
    const endpoint = courseId ? API_ENDPOINTS.courses.materials(courseId) : API_ENDPOINTS.materials.list;
    const { data } = await api.get(endpoint);
    return normalizeListResponse<Material>(data as Material[]);
  },

  async getMaterial(materialId: number | string): Promise<Material> {
    const { data } = await api.get<Material>(API_ENDPOINTS.materials.detail(materialId));
    return data;
  },

  async createMaterial(payload: MaterialPayload | FormData): Promise<Material> {
    const { data } = await api.post<Material>(API_ENDPOINTS.materials.list, payload);
    return data;
  },

  async updateMaterial(materialId: number | string, payload: Partial<MaterialPayload> | FormData): Promise<Material> {
    const { data } = await api.patch<Material>(API_ENDPOINTS.materials.detail(materialId), payload);
    return data;
  },

  async deleteMaterial(materialId: number | string): Promise<void> {
    await api.delete(API_ENDPOINTS.materials.detail(materialId));
  }
};
