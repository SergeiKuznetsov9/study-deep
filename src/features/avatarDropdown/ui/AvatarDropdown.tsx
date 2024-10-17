import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  useIsUserAdmin,
  useIsUserManager,
  User,
  userActions,
} from "@/entities/User";
import {
  getRouteArticleAdminPanel,
  getRouteProfile,
} from "@/shared/const/router";
import { Dropdown } from "@/shared/ui/Dropdown";
import { Avatar } from "@/shared/ui/Avatar";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

interface AvatarDropdownProps {
  className?: string;
  authData: User;
}

export const AvatarDropdown: FC<AvatarDropdownProps> = ({ authData }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isAdmin = useIsUserAdmin();
  const isManager = useIsUserManager();
  const isAdminPanelAvailable = isAdmin || isManager;

  const onLogout = useCallback(
    () => dispatch(userActions.logout()),
    [dispatch]
  );

  return (
    <Dropdown
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                id: "3",
                content: t("Админка"),
                href: getRouteArticleAdminPanel(),
              },
            ]
          : []),
        {
          id: "1",
          content: t("Профиль"),
          href: getRouteProfile(authData.username),
        },
        { id: "2", content: t("Выйти"), onClick: onLogout },
      ]}
      trigger={
        <Avatar size={30} src={authData.avatar} fallbackInverted={true} />
      }
    />
  );
};
