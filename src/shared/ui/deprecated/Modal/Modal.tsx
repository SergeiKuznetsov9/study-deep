import { FC, ReactNode, useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";

import { classNames } from "@/shared/lib/classNames/classNames";

import { Portal } from "../../Portal/Portal";
import { Overlay } from "../../Overlay/Overlay";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * Устарел, необходимо использовать новый компонент
 * @deprecated
 */
export const Modal: FC<ModalProps> = ({
  className,
  children,
  isOpen,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const springs = useSpring({
    from: { transform: "scale(0.5)" },
    to: { transform: isOpen ? "scale(1)" : "scale(0.2)" },
    config: { tension: 300, friction: 25, duration: 200 },
    onRest: () => {
      if (!isOpen) {
        setIsMounted(false);
      }
    },
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      setIsMounted(true);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, { [cls.opened]: isMounted }, [
          className,
        ])}
      >
        <Overlay onClick={onClose} />
        <animated.div
          className={cls.content}
          style={{
            ...springs,
          }}
        >
          {children}
        </animated.div>
      </div>
    </Portal>
  );
};
