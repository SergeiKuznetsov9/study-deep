import { FC, memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Text.module.scss";

export type TextVariant = "primary" | "error" | "accent";

export type TextAlign = "right" | "left" | "center";

export type TextSize = "s" | "m" | "l";

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;
}

type HeaderTag = "h1" | "h2" | "h3";

const mapSizeToHeaderTag: Record<TextSize, HeaderTag> = {
  s: "h3",
  m: "h2",
  l: "h1",
};

export const Text: FC<TextProps> = memo(
  ({
    className,
    title,
    text,
    variant = "primary",
    align = "left",
    size = "m",
    bold,
  }) => {
    const HeaderTag = mapSizeToHeaderTag[size];

    return (
      <div
        className={classNames(cls.Text, { [cls.bold]: bold }, [
          className,
          cls[variant],
          cls[align],
          cls[size],
        ])}
      >
        {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
        {text && <p className={cls.text}>{text}</p>}
      </div>
    );
  }
);
