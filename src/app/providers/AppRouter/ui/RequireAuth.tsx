import { getUserAuthData } from "entities/User";
import { Navigate, useLocation } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";

interface RequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth({ children }: RequireAuthProps) {
  const auth = useAppSelector(getUserAuthData);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
  }
  return children;
}
