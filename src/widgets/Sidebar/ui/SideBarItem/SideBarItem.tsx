import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { useUserAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink";

import { SideBarItemType } from "../../model/types/sidebar";
import cls from "./SideBarItem.module.scss";

interface SideBarItemProps {
  item: SideBarItemType;
  collapsed: boolean;
  authOnly?: boolean;
}

export const SideBarItem: FC<SideBarItemProps> = memo(({ item, collapsed }) => {
  const { t } = useTranslation();
  const isAuth = useUserAuthData();

  if (item.authOnly && !isAuth) {
    return null;
  }

  const { path, text, Icon } = item;

  return (
    <AppLink
      to={path}
      theme={AppLinkTheme.SECONDARY}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
    >
      <Icon className={cls.icon} />
      <span className={cls.link}>{t(text)}</span>
    </AppLink>
  );
});
