import { FC } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss";

interface NavbarPops {
  className?: string;
}

export const Navbar: FC<NavbarPops> = ({ className }) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
    </div>
  );
};
