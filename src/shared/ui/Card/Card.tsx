import { FC, HTMLAttributes, ReactNode } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Card.module.scss";

export type CardVariant = "normal" | "outline" | "light";
export type CardPadding = "0" | "8" | "16" | "24";
export type CardBorder = "round" | "default" | "partial";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  max?: boolean;
  padding?: CardPadding;
  border?: CardBorder;
  fullHeight?: boolean;
}

const mapPaddingToClass: Record<CardPadding, string> = {
  "0": "gap_0",
  "8": "gap_8",
  "16": "gap_16",
  "24": "gap_24",
};

export const Card: FC<CardProps> = ({
  className,
  children,
  max,
  variant = "normal",
  padding = "8",
  border = "default",
  fullHeight,
  ...otherProps
}) => {
  const paddingClass = mapPaddingToClass[padding];

  return (
    <div
      className={classNames(
        cls.Card,
        { [cls.max]: max, [cls.fullHeight]: fullHeight },
        [className, cls[variant], cls[paddingClass], cls[border]]
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
};
