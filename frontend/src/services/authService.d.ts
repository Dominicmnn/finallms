import type { AuthResponse, ForgotPasswordRequest, LoginRequest, RefreshTokenRequest, SignupRequest } from "@/types/auth";
import type { User } from "@/types/user";
export declare const authService: {
    login(payload: LoginRequest): Promise<AuthResponse>;
    signup(payload: SignupRequest): Promise<AuthResponse | {
        detail: string;
    }>;
    forgotPassword(payload: ForgotPasswordRequest): Promise<{
        detail: string;
    }>;
    refreshToken(payload: RefreshTokenRequest): Promise<AuthResponse>;
    me(): Promise<User>;
};
