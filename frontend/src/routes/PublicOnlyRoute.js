import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { FullPageSpinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { getDefaultRouteByRole } from "@/utils/role";
function PublicOnlyRoute({ children }) {
    const { isAuthenticated, isLoading, user } = useAuth();
    if (isLoading) {
        return _jsx(FullPageSpinner, {});
    }
    if (isAuthenticated) {
        return _jsx(Navigate, { to: getDefaultRouteByRole(user?.role), replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
export default PublicOnlyRoute;
