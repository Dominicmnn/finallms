import api from "@/services/api";
import { API_ENDPOINTS } from "@/services/endpoints";
import { normalizeListResponse } from "@/utils/api";
export const courseService = {
    async listCourses(filters = {}) {
        const params = Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== undefined && value !== ""));
        const { data } = await api.get(API_ENDPOINTS.courses.list, { params });
        return normalizeListResponse(data);
    },
    async getCourse(courseId) {
        const { data } = await api.get(API_ENDPOINTS.courses.detail(courseId));
        return data;
    },
    async createCourse(payload) {
        const { data } = await api.post(API_ENDPOINTS.courses.list, payload);
        return data;
    },
    async updateCourse(courseId, payload) {
        const { data } = await api.patch(API_ENDPOINTS.courses.detail(courseId), payload);
        return data;
    },
    async deleteCourse(courseId) {
        await api.delete(API_ENDPOINTS.courses.detail(courseId));
    }
};
