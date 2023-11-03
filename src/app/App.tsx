import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "./providers/ThemeProvider";
import { AppRouter } from "./providers/router";
import { Navbar } from "widgets/Navbar";
import { Sidebar } from "widgets/Sidebar";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

import "shared/config/i18n/i18n";

const Component = () => {
  const { t, i18n } = useTranslation();

  const onToggle = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <>
      <button onClick={onToggle}>{t("Перевод")}</button>
      <div>{t("Тестовый перевод")}</div>
    </>
  );
};

export const App = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames("app", {}, [theme])}>
      <Suspense fallback={""}>
        <Component />
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};
