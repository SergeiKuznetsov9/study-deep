import { Fragment, ReactNode } from "react";
import {
  Listbox as HListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./ListBox.module.scss";

export interface ListBoxItem<T extends string> {
  value: T;
  content: ReactNode;
  disabled?: boolean;
}

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface ListBoxProps<T extends string> {
  items?: ListBoxItem<T>[];
  className?: string;
  label?: string;
  value?: T;
  defaultValue?: string;
  readonly?: boolean;
  onChange: (value: T) => void;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const ListBox = <T extends string>({
  items,
  className,
  value,
  defaultValue,
  onChange,
  readonly,
  label,
  addonLeft,
  addonRight,
}: ListBoxProps<T>) => {
  const selectedItem = items?.find((item) => item.value === value);

  return (
    <HListbox
      as={"div"}
      className={classNames(cls.ListBox, {}, [className])}
      value={value}
      onChange={onChange}
      disabled={readonly}
    >
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <ListboxButton
        className={classNames(
          cls.trigger,
          { [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight) },
          []
        )}
        disabled={readonly}
      >
        <div
          className={classNames(
            cls.ButtonWrapper,
            {
              [cls.withAddonLeft]: Boolean(addonLeft),
              [cls.withAddonRight]: Boolean(addonRight),
            },
            [className]
          )}
        >
          <div className={cls.addonLeft}>{addonLeft}</div>
          {selectedItem?.content ?? defaultValue}
          <div className={cls.addonRight}>{addonRight}</div>
        </div>
      </ListboxButton>
      <ListboxOptions
        className={`${cls.options} w-[var(--button-width)]`}
        anchor="bottom start"
      >
        {items?.map((item) => (
          <ListboxOption
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            as={Fragment}
          >
            {({ focus, selected }) => (
              <li
                className={classNames(cls.item, {
                  [cls.focus]: focus,
                  [cls.disabled]: item.disabled,
                  [cls.selected]: selected,
                })}
              >
                {item.content}
              </li>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </HListbox>
  );
};
