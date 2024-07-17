import { ChangeEvent, FC, memo, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Select.module.scss";

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  options?: SelectOption[];
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select: FC<SelectProps> = memo(
  ({ className, label, options, value, onChange, readonly }) => {
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
      onChange?.(e.target.value);
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
  }
);
