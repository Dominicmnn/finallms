import type { ListResponse } from "@/types/api";
import type { User, UserProfileUpdatePayload } from "@/types/user";
export declare const userService: {
    listUsers(params?: Record<string, string | number>): Promise<ListResponse<User>>;
    getUser(userId: number | string): Promise<User>;
    updateMe(payload: UserProfileUpdatePayload): Promise<User>;
    updateUser(userId: number | string, payload: Partial<User>): Promise<User>;
    deleteUser(userId: number | string): Promise<void>;
};
