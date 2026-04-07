import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate, useLocation } from "react-router-dom";
import { FullPageSpinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { getDefaultRouteByRole } from "@/utils/role";
function ProtectedRoute({ children, allowedRoles }) {
    const location = useLocation();
    const { isAuthenticated, isLoading, user } = useAuth();
    if (isLoading) {
        return _jsx(FullPageSpinner, {});
    }
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/login", replace: true, state: { from: location } });
    }
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return _jsx(Navigate, { to: getDefaultRouteByRole(user.role), replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
export default ProtectedRoute;
