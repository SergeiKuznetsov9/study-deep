import React, { FC, memo } from "react";

import { classNames } from "shared/lib/classNames/classNames";

import cls from "./Icon.module.scss";

interface IconProps {
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  className?: string;
  inverted?: boolean;
}

export const Icon: FC<IconProps> = memo(({ Svg, className, inverted }) => {
  return (
    <Svg
      className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
        className,
      ])}
    ></Svg>
  );
});
