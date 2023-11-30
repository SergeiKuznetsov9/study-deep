import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { LoginModal } from "features/authByUserName";
import cls from "./Navbar.module.scss";

interface NavbarPops {
  className?: string;
}

export const Navbar: FC<NavbarPops> = ({ className }) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthModal] = useState(false);

  const onCloseModal = useCallback(() => setIsAuthModal(false), []);
  const onShowModal = useCallback(() => setIsAuthModal(true), []);

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onShowModal}
      >
        {t("Войти")}
      </Button>
      <LoginModal isOpen={isAuthModal} onClose={onCloseModal}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius,
          maiores cumque? Nemo voluptatem libero error ipsa accusantium, quod
          obcaecati culpa et eos similique, necessitatibus adipisci nesciunt.
          Soluta quis ad voluptatum.
        </div>
      </LoginModal>
    </div>
  );
};
