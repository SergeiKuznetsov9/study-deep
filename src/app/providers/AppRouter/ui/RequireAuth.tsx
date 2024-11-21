import { useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useUserRoles, UserRole, useUserAuthData } from "@/entities/User";
import { getRouteForbidden, getRouteMain } from "@/shared/const/router";

interface RequireAuthProps {
  children: JSX.Element;
  roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const auth = useUserAuthData();
  const userRoles = useUserRoles();
  const location = useLocation();

  const hasRequiredRoles = useMemo(() => {
    if (!roles) {
      return true;
    }
    return roles.some((requiredRole) => userRoles?.includes(requiredRole));
  }, [roles]);

  if (!auth) {
    return <Navigate to={getRouteMain()} state={{ from: location }} replace />;
  }

  if (!hasRequiredRoles) {
    return (
      <Navigate to={getRouteForbidden()} state={{ from: location }} replace />
    );
  }

  return children;
}
