import { FC, ReactNode, Suspense } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Modal } from "@/shared/ui/Modal/Modal";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import cls from "./LoginModal.module.scss";
import { Loader } from "@/shared/ui/Loader";

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
}) => (
  <Modal
    className={classNames(cls.LoginModal, {}, [className])}
    isOpen={isOpen}
    onClose={onClose}
  >
    <Suspense fallback={<Loader />}>
      <LoginFormAsync onSuccess={onClose} />
    </Suspense>
  </Modal>
);
