import { ButtonHTMLAttributes, FC, memo, ReactNode } from "react";
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
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button: FC<ButtonProps> = memo(
  ({
    className,
    children,
    variant = "outline",
    square,
    disabled,
    size = "m",
    addonRight,
    addonLeft,
    ...otherProps
  }) => {
    const mods: Mods = {
      [cls.square]: square,
      [cls.disabled]: disabled,
      [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
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
        <div
          className={classNames(
            cls.InputWrapper,
            {
              [cls.withAddonLeft]: Boolean(addonLeft),
              [cls.withAddonRight]: Boolean(addonRight),
            },
            [className]
          )}
        >
          <div className={cls.addonLeft}>{addonLeft}</div>

          {children}
          <div className={cls.addonRight}>{addonRight}</div>
        </div>
      </button>
    );
  }
);
