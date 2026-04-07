import api from "@/services/api";
import { API_ENDPOINTS } from "@/services/endpoints";
import type {
  AuthResponse,
  ForgotPasswordRequest,
  LoginRequest,
  RefreshTokenRequest,
  SignupRequest
} from "@/types/auth";
import type { User } from "@/types/user";

export const authService = {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(API_ENDPOINTS.auth.login, payload);
    return data;
  },

  async signup(payload: SignupRequest): Promise<AuthResponse | { detail: string }> {
    const { data } = await api.post<AuthResponse | { detail: string }>(API_ENDPOINTS.auth.signup, payload);
    return data;
  },

  async forgotPassword(payload: ForgotPasswordRequest): Promise<{ detail: string }> {
    const { data } = await api.post<{ detail: string }>(API_ENDPOINTS.auth.forgotPassword, payload);
    return data;
  },

  async refreshToken(payload: RefreshTokenRequest): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(API_ENDPOINTS.auth.refresh, payload);
    return data;
  },

  async me(): Promise<User> {
    const { data } = await api.get<User>(API_ENDPOINTS.auth.me);
    return data;
  }
};
