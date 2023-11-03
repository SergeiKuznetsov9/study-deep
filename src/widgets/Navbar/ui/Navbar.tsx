import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { useTranslation } from "react-i18next";

interface NavbarPops {
  className?: string;
}

export const Navbar: FC<NavbarPops> = ({ className }) => {
  const { t } = useTranslation();
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink
          to={"/"}
          className={cls.mainLink}
          theme={AppLinkTheme.SECONDARY}
        >
          {t("Главная страница").toUpperCase()}
        </AppLink>
        <AppLink to={"/about"} theme={AppLinkTheme.SECONDARY}>
          {t("О сайте").toUpperCase()}
        </AppLink>
      </div>
    </div>
  );
};
