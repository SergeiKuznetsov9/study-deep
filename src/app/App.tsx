import { Suspense, useEffect } from "react";
import { AppRouter } from "./providers/AppRouter";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { getUserInited, userActions } from "entities/User";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import "shared/config/i18n/i18n";

export const App = () => {
  const dispatch = useAppDispatch();
  const isUserInit = useAppSelector(getUserInited);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className="app">
      <Suspense fallback={""}>
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {isUserInit && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
};
