import {
  FC,
  InputHTMLAttributes,
  memo,
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
    ...otherProps
  }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const ref = useRef<HTMLInputElement>(null);
    const isCaretVisible = isFocused && !readonly;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
      setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    const onFocus = () => {
      setIsFocused(true);
    };

    const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCaretPosition(e?.target?.selectionStart || 0);
    };

    useEffect(() => {
      if (autoFocus) {
        setIsFocused(true);

        ref.current?.focus();
      }
    }, [autoFocus]);

    return (
      <div
        className={classNames(cls.InputWrapper, { [cls.readonly]: readonly }, [
          className,
        ])}
      >
        {placeholder && (
          <div className={cls.placeholder}>{`${placeholder}>`}</div>
        )}

        <div className={cls.caretWrapper}>
          <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChangeHandler}
            className={cls.input}
            onFocus={onFocus}
            onBlur={onBlur}
            onSelect={onSelect}
            readOnly={readonly}
            {...otherProps}
          />
          {isCaretVisible && (
            <span
              style={{ left: `${caretPosition * 8.83}px` }}
              className={cls.caret}
            ></span>
          )}
        </div>
      </div>
    );
  }
);
