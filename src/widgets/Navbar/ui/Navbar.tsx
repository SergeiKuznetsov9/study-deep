import { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import { Modal } from "shared/ui/Modal/Modal";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import cls from "./Navbar.module.scss";

interface NavbarPops {
  className?: string;
}

export const Navbar: FC<NavbarPops> = ({ className }) => {
  const { t } = useTranslation();
  const [isAuthModal, setIsAuthOpen] = useState(false);

  const onToggleModal = useCallback(() => setIsAuthOpen((prev) => !prev), []);

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Button
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
        onClick={onToggleModal}
      >
        {t("Войти")}
      </Button>
      <Modal isOpen={isAuthModal} onClose={onToggleModal}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius,
          maiores cumque? Nemo voluptatem libero error ipsa accusantium, quod
          obcaecati culpa et eos similique, necessitatibus adipisci nesciunt.
          Soluta quis ad voluptatum.
        </div>
      </Modal>
    </div>
  );
};
