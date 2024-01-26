import { getUserAuthData } from "entities/User";
import { Suspense, memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "widgets/PageLoader";

export const AppRouter = memo(() => {
  const isAuth = useSelector(getUserAuthData);
  const routes = useMemo(() => {
    return Object.values(routeConfig).filter((route) => {
      if (route.authOnly && !isAuth) {
        return false;
      }

      return true;
    });
  }, [isAuth]);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route
            path={path}
            element={<div className="page-wrapper">{element}</div>}
            key={path}
          />
        ))}
      </Routes>
    </Suspense>
  );
});
