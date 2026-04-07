import api from "@/services/api";
import { API_ENDPOINTS } from "@/services/endpoints";
import { normalizeListResponse } from "@/utils/api";
export const materialService = {
    async listMaterials(courseId) {
        const endpoint = courseId ? API_ENDPOINTS.courses.materials(courseId) : API_ENDPOINTS.materials.list;
        const { data } = await api.get(endpoint);
        return normalizeListResponse(data);
    },
    async getMaterial(materialId) {
        const { data } = await api.get(API_ENDPOINTS.materials.detail(materialId));
        return data;
    },
    async createMaterial(payload) {
        const { data } = await api.post(API_ENDPOINTS.materials.list, payload);
        return data;
    },
    async updateMaterial(materialId, payload) {
        const { data } = await api.patch(API_ENDPOINTS.materials.detail(materialId), payload);
        return data;
    },
    async deleteMaterial(materialId) {
        await api.delete(API_ENDPOINTS.materials.detail(materialId));
    }
};
