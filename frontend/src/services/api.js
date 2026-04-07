import axios from "axios";
import { API_ENDPOINTS } from "@/services/endpoints";
import { storage } from "@/utils/storage";
// const apiBaseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const apiBaseURL = import.meta.env.VITE_API_BASE_URL || "https://finallms.onrender.com";
let isRefreshing = false;
let queuedRequests = [];
function flushQueue(token) {
    queuedRequests.forEach((callback) => callback(token));
    queuedRequests = [];
}
const api = axios.create({
    baseURL: apiBaseURL,
    headers: {
        "Content-Type": "application/json"
    }
});
api.interceptors.request.use((config) => {
    const token = storage.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    }
    return config;
});
api.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response?.status;
    const isAuthRefreshRequest = originalRequest?.url?.includes(API_ENDPOINTS.auth.refresh);
    if (statusCode !== 401 || !originalRequest || originalRequest._retry || isAuthRefreshRequest) {
        return Promise.reject(error);
    }
    const refreshToken = storage.getRefreshToken();
    if (!refreshToken) {
        storage.clear();
        window.dispatchEvent(new Event("auth:session-expired"));
        return Promise.reject(error);
    }
    originalRequest._retry = true;
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            queuedRequests.push((newToken) => {
                if (!newToken) {
                    reject(error);
                    return;
                }
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                resolve(api(originalRequest));
            });
        });
    }
    isRefreshing = true;
    try {
        const refreshResponse = await axios.post(`${apiBaseURL}${API_ENDPOINTS.auth.refresh}`, { refresh: refreshToken }, { headers: { "Content-Type": "application/json" } });
        const newAccessToken = refreshResponse.data.access;
        storage.setAccessToken(newAccessToken);
        if (refreshResponse.data.refresh) {
            storage.setRefreshToken(refreshResponse.data.refresh);
        }
        flushQueue(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
    }
    catch (refreshError) {
        flushQueue(null);
        storage.clear();
        window.dispatchEvent(new Event("auth:session-expired"));
        return Promise.reject(refreshError);
    }
    finally {
        isRefreshing = false;
    }
});
export default api;
