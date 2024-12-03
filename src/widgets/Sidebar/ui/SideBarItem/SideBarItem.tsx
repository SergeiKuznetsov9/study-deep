import { FC, memo } from "react";
import { useTranslation } from "react-i18next";

import { useUserAuthData } from "@/entities/User";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink";
import { Icon } from "@/shared/ui/Icon";

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

  const { path, text, Icon: icon } = item;

  return (
    <AppLink
      to={path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
      activeClassName={cls.active}
    >
      <Icon Svg={icon} />
      <span className={cls.link}>{t(text)}</span>
    </AppLink>
  );
});
