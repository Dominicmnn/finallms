import type { User } from "@/types/user";

const ACCESS_TOKEN_KEY = "lms_access_token";
const REFRESH_TOKEN_KEY = "lms_refresh_token";
const USER_KEY = "lms_user";

export const storage = {
  getAccessToken: (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY),
  setAccessToken: (token: string): void => localStorage.setItem(ACCESS_TOKEN_KEY, token),
  getRefreshToken: (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string): void => localStorage.setItem(REFRESH_TOKEN_KEY, token),
  getUser: (): User | null => {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },
  setUser: (user: User): void => localStorage.setItem(USER_KEY, JSON.stringify(user)),
  clear: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};
