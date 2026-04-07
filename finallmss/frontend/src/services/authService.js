import api from "@/services/api";
import { API_ENDPOINTS } from "@/services/endpoints";
export const authService = {
    async login(payload) {
        const { data } = await api.post(API_ENDPOINTS.auth.login, payload);
        return data;
    },
    async signup(payload) {
        const { data } = await api.post(API_ENDPOINTS.auth.signup, payload);
        return data;
    },
    async forgotPassword(payload) {
        const { data } = await api.post(API_ENDPOINTS.auth.forgotPassword, payload);
        return data;
    },
    async refreshToken(payload) {
        const { data } = await api.post(API_ENDPOINTS.auth.refresh, payload);
        return data;
    },
    async me() {
        const { data } = await api.get(API_ENDPOINTS.auth.me);
        return data;
    }
};
