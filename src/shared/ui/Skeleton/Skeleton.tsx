import { CSSProperties, FC } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string | number;
}

export const Skeleton: FC<SkeletonProps> = ({
  className,
  width,
  height,
  borderRadius,
}) => {
  const styles: CSSProperties = {
    width,
    height,
    borderRadius,
  };

  return (
    <div
      style={styles}
      className={classNames(cls.Skeleton, {}, [className])}
    ></div>
  );
};
