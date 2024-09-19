import { FC, ReactNode, useState } from "react";

import { useTheme } from "app/providers/ThemeProvider";
import { classNames } from "shared/lib/classNames/classNames";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";

import cls from "./Drawer.module.scss";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Drawer: FC<DrawerProps> = ({
  className,
  children,
  isOpen,
  onClose,
}) => {
  const { theme } = useTheme();

  const [isSwitchOnAnimation, setIsSwitchOnAnimation] = useState(false);

  setTimeout(() => {
    if (isOpen) {
      setIsSwitchOnAnimation(true);
    } else {
      setIsSwitchOnAnimation(false);
    }
  }, 0);

  return (
    <Portal>
      <div
        className={classNames(
          cls.Drawer,
          { [cls.opened]: isSwitchOnAnimation },
          [className, theme]
        )}
      >
        <Overlay onClick={onClose} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
