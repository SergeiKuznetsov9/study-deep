import { FC, ReactNode } from "react";
import {
  Popover as LibPopover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Popover.module.scss";

interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  children: ReactNode;
}

export const Popover: FC<PopoverProps> = ({ className, trigger, children }) => {
  return (
    <LibPopover className={classNames(cls.Popover, {}, [className])}>
      <PopoverButton className={cls.btn}>{trigger}</PopoverButton>
      <PopoverPanel anchor="bottom end" className={cls.menu}>
        {children}
      </PopoverPanel>
    </LibPopover>
  );
};
