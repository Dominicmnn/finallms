import type { ReactNode } from "react";
import type { UserRole } from "@/types/user";
interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: UserRole[];
}
declare function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps): import("react/jsx-runtime").JSX.Element;
export default ProtectedRoute;
