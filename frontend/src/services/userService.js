import api from "@/services/api";
import { API_ENDPOINTS } from "@/services/endpoints";
import { normalizeListResponse } from "@/utils/api";
export const userService = {
    async listUsers(params) {
        const { data } = await api.get(API_ENDPOINTS.users.list, { params });
        return normalizeListResponse(data);
    },
    async getUser(userId) {
        const { data } = await api.get(API_ENDPOINTS.users.detail(userId));
        return data;
    },
    async updateMe(payload) {
        const { data } = await api.patch(API_ENDPOINTS.auth.me, payload);
        return data;
    },
    async updateUser(userId, payload) {
        const { data } = await api.patch(API_ENDPOINTS.users.detail(userId), payload);
        return data;
    },
    async deleteUser(userId) {
        await api.delete(API_ENDPOINTS.users.detail(userId));
    }
};
