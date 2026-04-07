export type UserRole = "admin" | "tutor" | "student";
export interface UserSummary {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
}
export interface User extends UserSummary {
    avatar_url?: string | null;
    bio?: string | null;
    phone_number?: string | null;
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
}
export interface UserProfileUpdatePayload {
    first_name?: string;
    last_name?: string;
    avatar_url?: string | null;
    bio?: string | null;
    phone_number?: string | null;
}
