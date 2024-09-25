import { Suspense, memo, useCallback } from "react";
import { Route, Routes } from "react-router-dom";

import { PageLoader } from "@/widgets/PageLoader";
import { AppRoutesProps } from "@/shared/types/router";

import { RequireAuth } from "./RequireAuth";
import { routeConfig } from "../config/routeConfig";

export const AppRouter = memo(() => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = <>{route.element}</>;

    return (
      <Route
        path={route.path}
        element={
          route.authOnly ? (
            <RequireAuth roles={route.roles}>{element}</RequireAuth>
          ) : (
            element
          )
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
