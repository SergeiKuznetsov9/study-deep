import { CSSProperties, FC, useMemo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";

import { AppImage } from "../../AppImage/AppImage";
import { Skeleton } from "../Skeleton/Skeleton";
import UserIcon from "../../../assets/icons/deprecated/avatar.svg";
import { Icon } from "../Icon/Icon";
import cls from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

/**
 * Устарел, необходимо использовать новый компонент
 * @deprecated
 */
export const Avatar: FC<AvatarProps> = ({
  className,
  src,
  size = 100,
  alt,
  fallbackInverted,
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
      inverted={fallbackInverted}
      className={fallbackInverted ? cls.invertedAvatarIcon : cls.avatarIcon}
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
