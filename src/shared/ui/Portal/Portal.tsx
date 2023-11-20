import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children?: ReactNode; // то, что рендерим
  element?: HTMLElement; // контейнер для рендера
}

export const Portal: FC<PortalProps> = ({
  children,
  element = document.body,
}) => createPortal(children, element);
