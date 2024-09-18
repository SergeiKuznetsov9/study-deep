import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { LoginModal } from "features/authByUserName";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "entities/User";
import { NotificationList } from "entities/Notification";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Dropdown } from "shared/ui/Dropdown/Dropdown";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Icon } from "shared/ui/Icon/Icon";
import RingBellIcon from "shared/assets/icons/bell-ring.svg";
import { HStack } from "shared/ui/Stack";
import { Popover } from "shared/ui/Popover/Popover";

import cls from "./Navbar.module.scss";

interface NavbarPops {
  className?: string;
}

export const Navbar: FC<NavbarPops> = memo(({ className }) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const dispatch = useAppDispatch();
  const authData = useAppSelector(getUserAuthData);

  const isAdmin = useAppSelector(isUserAdmin);
  const isManager = useAppSelector(isUserManager);
  const isAdminPanelAvailable = isAdmin || isManager;

  const onCloseModal = useCallback(() => setIsAuthModal(false), []);
  const onShowModal = useCallback(() => setIsAuthModal(true), []);
  const onLogout = useCallback(
    () => dispatch(userActions.logout()),
    [dispatch]
  );

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className])}>
        <Text
          className={cls.appName}
          title="Wayfarer App"
          theme={TextTheme.INVERTED}
        />
        <AppLink
          to={RoutePath.article_create}
          theme={AppLinkTheme.SECONDARY}
          className={cls.createBtn}
        >
          {t("Создать статью")}
        </AppLink>
        <HStack gap="16" className={cls.actions}>
          <Popover trigger={<Icon Svg={RingBellIcon} inverted />}>
            <NotificationList className={cls.notifications} />
          </Popover>
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
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Войти")}
      </Button>
      {isAuthModal && (
        <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
      )}
    </header>
  );
});
