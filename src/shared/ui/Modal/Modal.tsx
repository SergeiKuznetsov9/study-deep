import { FC, ReactNode, useEffect, useState } from "react";

import { classNames } from "shared/lib/classNames/classNames";

import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

export const Modal: FC<ModalProps> = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const closeHandler = () => {
    if (onClose) {
      onClose();
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeHandler();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [isOpen]);

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, { [cls.opened]: isOpen }, [className])}
      >
        <Overlay onClick={closeHandler} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
