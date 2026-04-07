import api from "@/services/api";
import { API_ENDPOINTS } from "@/services/endpoints";
import type { ListResponse } from "@/types/api";
import type { User, UserProfileUpdatePayload } from "@/types/user";
import { normalizeListResponse } from "@/utils/api";

export const userService = {
  async listUsers(params?: Record<string, string | number>): Promise<ListResponse<User>> {
    const { data } = await api.get(API_ENDPOINTS.users.list, { params });
    return normalizeListResponse<User>(data as User[]);
  },

  async getUser(userId: number | string): Promise<User> {
    const { data } = await api.get<User>(API_ENDPOINTS.users.detail(userId));
    return data;
  },

  async updateMe(payload: UserProfileUpdatePayload): Promise<User> {
    const { data } = await api.patch<User>(API_ENDPOINTS.auth.me, payload);
    return data;
  },

  async updateUser(userId: number | string, payload: Partial<User>): Promise<User> {
    const { data } = await api.patch<User>(API_ENDPOINTS.users.detail(userId), payload);
    return data;
  },

  async deleteUser(userId: number | string): Promise<void> {
    await api.delete(API_ENDPOINTS.users.detail(userId));
  }
};
