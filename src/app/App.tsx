import { Suspense, useEffect } from "react";

import { Navbar } from "@/widgets/Navbar";
import { Sidebar } from "@/widgets/Sidebar";
import { useUserInited, userActions } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { MainLayout } from "@/shared/layouts/MainLayout";

import { AppRouter } from "./providers/AppRouter";
import { useAppToolbar } from "./lib/useAppToolbar";
import "@/shared/config/i18n/i18n";

export const App = () => {
  const dispatch = useAppDispatch();
  const isUserInit = useUserInited();
  const toolbar = useAppToolbar();

  useEffect(() => {
    if (!isUserInit) {
      dispatch(userActions.initAuthData());
    }
  }, [dispatch, isUserInit]);

  return (
    <div className="app">
      <Suspense fallback={""}>
        <MainLayout
          header={<Navbar />}
          content={<AppRouter />}
          sidebar={<Sidebar />}
          toolbar={toolbar}
        />
      </Suspense>
    </div>
  );
};
