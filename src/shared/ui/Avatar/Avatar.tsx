import { CSSProperties, FC, useMemo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src: string;
  size?: number;
  alt?: string;
}

export const Avatar: FC<AvatarProps> = ({ className, src, size, alt }) => {
  const styles = useMemo<CSSProperties>(() => {
    return {
      height: size || 100,
      width: size || 100,
    };
  }, [size]);

  return (
    <img
      src={src}
      className={classNames(cls.Avatar, {}, [className])}
      style={styles}
      alt={alt}
    />
  );
};
