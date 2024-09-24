import React, { FC, memo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./Icon.module.scss";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  className?: string;
  inverted?: boolean;
}

export const Icon: FC<IconProps> = memo(
  ({ Svg, className, inverted, ...otherProps }) => {
    return (
      <Svg
        className={classNames(inverted ? cls.inverted : cls.Icon, {}, [
          className,
        ])}
        {...otherProps}
      ></Svg>
    );
  }
);
