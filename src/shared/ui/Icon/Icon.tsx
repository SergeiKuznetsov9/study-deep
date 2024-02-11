import React, { FC, memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Icon.module.scss";

interface IconProps {
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  className?: string;
}

export const Icon: FC<IconProps> = memo(({ Svg, className }) => {
  return <Svg className={classNames(cls.Icon, {}, [className])}></Svg>;
});
