import { FC, memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { LoginModal } from "features/authByUserName";
import { getUserAuthData, userActions } from "entities/User";
import cls from "./Navbar.module.scss";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";

interface NavbarPops {
  className?: string;
}

export const Navbar: FC<NavbarPops> = memo(({ className }) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);
  const dispatch = useAppDispatch();
  const authData = useAppSelector(getUserAuthData);

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
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          className={cls.links}
          onClick={onLogout}
        >
          {t("Выйти")}
        </Button>
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
