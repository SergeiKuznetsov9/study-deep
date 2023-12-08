import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { LoginModal } from "features/authByUserName";
import { useAppDispatch, useAppSelector } from "app/providers/StoreProvider";
import { getUserAuthData, userActions } from "entities/User";
import cls from "./Navbar.module.scss";

interface NavbarPops {
  className?: string;
}

export const Navbar: FC<NavbarPops> = ({ className }) => {
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
      <div className={classNames(cls.navbar, {}, [className])}>
        <Button
          theme={ButtonTheme.CLEAR_INVERTED}
          className={cls.links}
          onClick={onLogout}
        >
          {t("Выйти")}
        </Button>
      </div>
    );
  }

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Войти")}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
    </div>
  );
};
