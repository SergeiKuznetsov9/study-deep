import { CSSProperties, FC, useMemo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";

import { AppImage } from "../AppImage/AppImage";
import { Skeleton } from "../Skeleton/Skeleton";
import UserIcon from "@/shared/assets/icons/avatar.svg";
import { Icon } from "../Icon/Icon";
import cls from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
}

export const Avatar: FC<AvatarProps> = ({
  className,
  src,
  size = 100,
  alt,
}) => {
  const styles = useMemo<CSSProperties>(() => {
    return {
      height: size,
      width: size,
    };
  }, [size]);

  const fallback = <Skeleton width={size} height={size} borderRadius={"50%"} />;
  const errorFallback = (
    <Icon
      Svg={UserIcon}
      width={size}
      height={size}
      className={cls.avatarIcon}
    />
  );

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      src={src}
      className={classNames(cls.Avatar, {}, [className])}
      style={styles}
      alt={alt}
    />
  );
};
