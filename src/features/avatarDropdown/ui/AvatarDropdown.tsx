import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { isUserAdmin, isUserManager, User, userActions } from "@/entities/User";
import { Dropdown } from "@/shared/ui/Dropdown/Dropdown";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector/useAppSelector";
import { RoutePath } from "@/shared/config/routeConfig/routeConfig";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";

interface AvatarDropdownProps {
  className?: string;
  authData: User;
}

export const AvatarDropdown: FC<AvatarDropdownProps> = ({ authData }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isAdmin = useAppSelector(isUserAdmin);
  const isManager = useAppSelector(isUserManager);
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
                href: RoutePath.admin_panel,
              },
            ]
          : []),
        {
          id: "1",
          content: t("Профиль"),
          href: RoutePath.profile + authData.id,
        },
        { id: "2", content: t("Выйти"), onClick: onLogout },
      ]}
      trigger={<Avatar size={30} src={authData.avatar} />}
    />
  );
};
