import { Suspense, memo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import {
  AppRoutesProps,
  routeConfig,
} from "shared/config/routeConfig/routeConfig";
import { PageLoader } from "widgets/PageLoader";
import { RequireAuth } from "./RequireAuth";

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <>{route.element}</>;

    return (
      <Route
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
        key={route.path}
      />
    );
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
    </Suspense>
  );
});
