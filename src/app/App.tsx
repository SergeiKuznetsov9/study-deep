import { Suspense, useEffect } from "react";
import { AppRouter } from "./providers/AppRouter";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { userActions } from "entities/User";
import "shared/config/i18n/i18n";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className="app">
      <Suspense fallback={""}>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};
