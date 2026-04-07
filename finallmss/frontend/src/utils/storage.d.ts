import type { User } from "@/types/user";
export declare const storage: {
    getAccessToken: () => string | null;
    setAccessToken: (token: string) => void;
    getRefreshToken: () => string | null;
    setRefreshToken: (token: string) => void;
    getUser: () => User | null;
    setUser: (user: User) => void;
    clear: () => void;
};
