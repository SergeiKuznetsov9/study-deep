import { ButtonHTMLAttributes, FC, memo } from "react";
import { Mods, classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Button.module.scss";

export type ButtonVariant = "clear" | "outline" | "filled";

export type ButtonSize = "m" | "l" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = memo(
  ({
    className,
    children,
    variant = "outline",
    square,
    disabled,
    size = "m",
    ...otherProps
  }) => {
    const mods: Mods = {
      [cls.square]: square,
      [cls.disabled]: disabled,
    };

    return (
      <button
        type="button"
        disabled={disabled}
        className={classNames(cls.Button, mods, [
          className,
          cls[variant],
          cls[size],
        ])}
        {...otherProps}
      >
        {children}
      </button>
    );
  }
);
