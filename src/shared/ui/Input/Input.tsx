import {
  FC,
  InputHTMLAttributes,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Input.module.scss";

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "readOnly"
  > {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoFocus?: boolean;
  readonly?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Input: FC<InputProps> = memo(
  ({
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    autoFocus,
    readonly,
    addonLeft,
    addonRight,
    ...otherProps
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    const onFocus = () => {
      setIsFocused(true);
    };

    useEffect(() => {
      if (autoFocus) {
        setIsFocused(true);

        ref.current?.focus();
      }
    }, [autoFocus]);

    return (
      <div
        className={classNames(
          cls.InputWrapper,
          {
            [cls.readonly]: readonly,
            [cls.focused]: isFocused,
            [cls.withAddonLeft]: Boolean(addonLeft),
            [cls.withAddonRight]: Boolean(addonRight),
          },
          [className]
        )}
      >
        <div className={cls.addonLeft}>{addonLeft}</div>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChangeHandler}
          className={cls.input}
          onFocus={onFocus}
          onBlur={onBlur}
          readOnly={readonly}
          placeholder={placeholder}
          {...otherProps}
        />
        <div className={cls.addonRight}>{addonRight}</div>
      </div>
    );
  }
);
