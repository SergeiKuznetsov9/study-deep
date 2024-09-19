import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { LoginModal } from "features/authByUserName";
import { NotificationButton } from "features/notificationButton";
import { AvatarDropdown } from "features/avatarDropdown";
import { getUserAuthData } from "entities/User";
import { NotificationList } from "entities/Notification";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { HStack } from "shared/ui/Stack";
import { Drawer } from "shared/ui/Drawer/Drawer";

import cls from "./Navbar.module.scss";

interface NavbarPops {
  className?: string;
}

export const Navbar: FC<NavbarPops> = memo(({ className }) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useAppSelector(getUserAuthData);

  const onCloseModal = useCallback(() => setIsAuthModal(false), []);
  const onShowModal = useCallback(() => setIsAuthModal(true), []);

  const [isOpen, setIsOpen] = useState(false);

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
          <button onClick={() => setIsOpen(true)}>Click</button>
          <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <NotificationList />
          </Drawer>
          <NotificationButton />
          <AvatarDropdown authData={authData} />
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
