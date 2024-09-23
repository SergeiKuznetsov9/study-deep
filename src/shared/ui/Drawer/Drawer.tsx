import { FC, memo, ReactNode, useEffect, useState } from "react";

import { useTheme } from "@/app/providers/ThemeProvider";
import { useAnimationLibs } from "@/shared/lib/components/AnimationProvider";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";

import cls from "./Drawer.module.scss";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export const DrawerContent: FC<DrawerProps> = ({
  className,
  children,
  isOpen,
  onClose,
}) => {
  const { Spring } = useAnimationLibs();
  const [isMounted, setIsMounted] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const { theme } = useTheme();

  const springs = Spring.useSpring({
    from: { transform: "translateY(105%)" },
    to: { transform: isOpen ? "translateY(0%)" : "translateY(105%)" },
    config: { tension: 300, friction: 25 },
    onRest: () => {
      if (!isOpen) {
        setIsMounted(false);
      }
    },
  });

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Drawer, { [cls.opened]: isMounted }, [
          className,
          theme,
        ])}
      >
        <Overlay onClick={onClose} />
        <Spring.animated.div
          className={cls.content}
          style={{
            ...springs,
          }}
        >
          {children}
        </Spring.animated.div>
      </div>
    </Portal>
  );
};

export const Drawer = memo((props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
});
