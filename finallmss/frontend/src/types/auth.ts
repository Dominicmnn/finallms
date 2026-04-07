import type { User } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: "student" | "tutor";
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface AuthTokens {
  access: string;
  refresh?: string;
}

export interface AuthResponse extends AuthTokens {
  user?: User;
}

export interface RefreshTokenRequest {
  refresh: string;
}
