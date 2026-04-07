import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { FullPageSpinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";
import { getDefaultRouteByRole } from "@/utils/role";

interface PublicOnlyRouteProps {
  children: ReactNode;
}

function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return <FullPageSpinner />;
  }

  if (isAuthenticated) {
    return <Navigate to={getDefaultRouteByRole(user?.role)} replace />;
  }

  return <>{children}</>;
}

export default PublicOnlyRoute;
