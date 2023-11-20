import { Suspense } from "react";
import { AppRouter } from "./providers/AppRouter";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import "shared/config/i18n/i18n";

export const App = () => {
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
