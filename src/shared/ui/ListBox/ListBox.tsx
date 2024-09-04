import {
  Listbox as HListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import cls from "./ListBox.module.scss";
import { Fragment, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { Button } from "../Button/Button";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  readonly?: boolean;
  onChange: <T extends string>(value: T) => void;
}

export const ListBox = ({
  items,
  className,
  value,
  defaultValue,
  onChange,
  readonly,
  label,
}: ListBoxProps) => {
  //   пропс as={'div'} используется для указания тега обертки
  return (
    <HListbox
      as={"div"}
      className={classNames(cls.ListBox, {}, [className])}
      value={value}
      onChange={onChange}
      disabled={readonly}
    >
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <ListboxButton className={cls.trigger} disabled={readonly}>
        <Button disabled={readonly}>{value ?? defaultValue}</Button>
      </ListboxButton>
      <ListboxOptions
        className={`${cls.options} w-[var(--button-width)]`}
        style={{ width: "var(--button-width)" }}
        anchor="bottom"
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
                })}
              >
                {selected && "!!!"}
                {item.content}
              </li>
            )}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </HListbox>
  );
};
