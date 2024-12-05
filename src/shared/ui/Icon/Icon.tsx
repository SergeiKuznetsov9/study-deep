import React, { FC, memo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./Icon.module.scss";

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, "onClick">;

interface IconBaseProps extends SvgProps {
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  className?: string;
}

interface IconNonClickableProps extends IconBaseProps {
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  className?: string;
  clickable?: false;
}

interface IconClickableProps extends IconBaseProps {
  Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  className?: string;
  clickable?: true;
  onClick: () => void;
}

type IconProps = IconNonClickableProps | IconClickableProps;

export const Icon: FC<IconProps> = memo((props) => {
  const {
    Svg,
    className = "",
    width = 32,
    height = 32,
    clickable,
    ...otherProps
  } = props;

  const icon = (
    <Svg
      className={classNames(cls.Icon, {}, [className])}
      width={width}
      height={height}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button
        onClick={props.onClick}
        type="button"
        className={cls.Button}
        style={{ height, width }}
      >
        {icon}
      </button>
    );
  }
  return icon;
});
