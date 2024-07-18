import { FC, HTMLAttributes, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Card.module.scss";

export enum CardTheme {
  NORMAL = "normal",
  OUTLINE = "outline",
}
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  theme?: CardTheme;
}

export const Card: FC<CardProps> = ({
  className,
  children,
  theme = CardTheme.NORMAL,
  ...otherProps
}) => {
  return (
    <div
      className={classNames(cls.Card, {}, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
};
