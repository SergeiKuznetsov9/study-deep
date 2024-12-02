import { ChangeEvent, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Select.module.scss";

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  options?: SelectOption<T>[];
  label?: string;
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

/**
 * Устарел, необходимо использовать новый компонент
 * @deprecated
 */
export const Select = <T extends string>({
  className,
  label,
  options,
  value,
  onChange,
  readonly,
}: SelectProps<T>) => {
  const optionsList = useMemo(
    () =>
      options?.map((opt) => (
        <option className={cls.option} value={opt.value} key={opt.value}>
          {opt.content}
        </option>
      )),
    [options]
  );

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  return (
    <div className={classNames(cls.Wrapper, {}, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select
        disabled={readonly}
        onChange={onChangeHandler}
        value={value}
        className={cls.select}
      >
        {optionsList}
      </select>
    </div>
  );
};
