import { FC, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import cls from "./LoginModal.module.scss";

interface LoginModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export const LoginModal: FC<LoginModalProps> = ({
  className,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      className={classNames(cls.LoginModal, {}, [className])}
      isOpen={isOpen}
      onClose={onClose}
      lazy
    >
      <LoginForm />
    </Modal>
  );
};
