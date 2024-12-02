import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./Dropdown.module.scss";
import { Fragment, ReactNode } from "react";
import { AppLink } from "../AppLink/AppLink";

export interface DropdownItem {
  id: string;
  disabled?: boolean;
  content?: ReactNode;
  onClick?: () => void;
  href?: string;
}

interface DropdownProps {
  items: DropdownItem[];
  trigger: ReactNode;

  className?: string;
}

/**
 * Устарел, необходимо использовать новый компонент
 * @deprecated
 */
export const Dropdown = ({ items, trigger, className }: DropdownProps) => {
  return (
    <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
      <MenuButton className={cls.btn}>{trigger}</MenuButton>
      <MenuItems anchor="bottom end" className={cls.menu}>
        {items.map((item) => {
          const content = ({ focus }: { focus: boolean }) => (
            <button
              type="button"
              className={classNames(cls.item, { [cls.active]: focus }, [])}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.content}
            </button>
          );

          if (item.href) {
            return (
              <MenuItem
                key={item.id}
                as={AppLink}
                to={item.href}
                disabled={item.disabled}
              >
                {content}
              </MenuItem>
            );
          }

          return (
            <MenuItem key={item.id} as={Fragment} disabled={item.disabled}>
              {content}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};
