import { FC, ReactNode, memo } from "react";
import { LinkProps, NavLink } from "react-router-dom";

import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./AppLink.module.scss";

export type AppLinkVariant = "primary" | "secondary";

interface AppLinkProps extends LinkProps {
  className?: string;
  activeClassName?: string;
  children: ReactNode;
  variant?: AppLinkVariant;
}

export const AppLink: FC<AppLinkProps> = memo(
  ({
    to,
    className,
    children,
    variant = "primary",
    activeClassName = "",
    ...otherProps
  }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          classNames(cls.AppLink, { [activeClassName]: isActive }, [
            className,
            cls[variant],
          ])
        }
        {...otherProps}
      >
        {children}
      </NavLink>
    );
  }
);
