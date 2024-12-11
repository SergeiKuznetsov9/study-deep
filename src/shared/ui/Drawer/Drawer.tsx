import { FC, ReactNode, useEffect, useState } from "react";

import {
  AnimationProvider,
  useAnimationLibs,
} from "@/shared/lib/components/AnimationProvider";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Portal } from "../Portal";
import { Overlay } from "../Overlay";

import cls from "./Drawer.module.scss";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const DrawerContent: FC<DrawerProps> = ({
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

const DrawerAsync = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => (
  <AnimationProvider>
    <DrawerAsync {...props} />
  </AnimationProvider>
);
