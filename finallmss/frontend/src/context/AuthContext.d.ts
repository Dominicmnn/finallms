import { type ReactNode } from "react";
import type { LoginRequest, SignupRequest } from "@/types/auth";
import type { User } from "@/types/user";
export interface AuthContextValue {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (payload: LoginRequest) => Promise<void>;
    signup: (payload: SignupRequest) => Promise<void>;
    logout: () => void;
    refreshMe: () => Promise<void>;
}
export declare const AuthContext: import("react").Context<AuthContextValue | null>;
export declare function AuthProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
