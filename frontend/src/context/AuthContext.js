import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { extractApiError } from "@/utils/api";
import { getDefaultRouteByRole } from "@/utils/role";
import { storage } from "@/utils/storage";
export const AuthContext = createContext(null);
export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => storage.getUser());
    const [accessToken, setAccessToken] = useState(() => storage.getAccessToken());
    const [isLoading, setIsLoading] = useState(true);
    const clearSession = useCallback(() => {
        storage.clear();
        setAccessToken(null);
        setUser(null);
    }, []);
    const applySession = useCallback((token, refresh, me) => {
        storage.setAccessToken(token);
        if (refresh) {
            storage.setRefreshToken(refresh);
        }
        storage.setUser(me);
        setAccessToken(token);
        setUser(me);
    }, []);
    const refreshMe = useCallback(async () => {
        const me = await authService.me();
        storage.setUser(me);
        setUser(me);
    }, []);
    const login = useCallback(async (payload) => {
        const response = await authService.login(payload);
        if (!response.access) {
            throw new Error("Authentication token was not returned by the API.");
        }
        const me = response.user ?? (await authService.me());
        applySession(response.access, response.refresh, me);
        navigate(getDefaultRouteByRole(me.role), { replace: true });
    }, [applySession, navigate]);
    const signup = useCallback(async (payload) => {
        const response = await authService.signup(payload);
        if ("access" in response && response.access) {
            const me = response.user ?? (await authService.me());
            applySession(response.access, response.refresh, me);
            navigate(getDefaultRouteByRole(me.role), { replace: true });
            return;
        }
        navigate("/login", { replace: true });
    }, [applySession, navigate]);
    const logout = useCallback(() => {
        clearSession();
        navigate("/login", { replace: true });
    }, [clearSession, navigate]);
    useEffect(() => {
        let isMounted = true;
        async function bootstrapSession() {
            const token = storage.getAccessToken();
            if (!token) {
                if (isMounted) {
                    setIsLoading(false);
                }
                return;
            }
            try {
                const me = await authService.me();
                if (!isMounted) {
                    return;
                }
                storage.setUser(me);
                setAccessToken(token);
                setUser(me);
            }
            catch (error) {
                if (!isMounted) {
                    return;
                }
                clearSession();
                const reason = extractApiError(error);
                if (reason) {
                    // Keep the catch branch side-effect explicit while preserving strict noUnusedLocals.
                    void reason;
                }
            }
            finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        }
        void bootstrapSession();
        return () => {
            isMounted = false;
        };
    }, [clearSession]);
    useEffect(() => {
        const handleSessionExpiry = () => {
            clearSession();
            navigate("/login", { replace: true });
        };
        window.addEventListener("auth:session-expired", handleSessionExpiry);
        return () => window.removeEventListener("auth:session-expired", handleSessionExpiry);
    }, [clearSession, navigate]);
    const value = useMemo(() => ({
        user,
        accessToken,
        isAuthenticated: Boolean(accessToken),
        isLoading,
        login,
        signup,
        logout,
        refreshMe
    }), [accessToken, isLoading, login, logout, refreshMe, signup, user]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
