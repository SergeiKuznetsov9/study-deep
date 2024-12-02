import { FC } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./Overlay.module.scss";

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

/**
 * Устарел, необходимо использовать новый компонент
 * @deprecated
 */
export const Overlay: FC<OverlayProps> = ({ className, onClick }) => (
  <div
    onClick={onClick}
    className={classNames(cls.Overlay, {}, [className])}
  ></div>
);
