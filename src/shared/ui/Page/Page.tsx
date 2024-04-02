import { FC, ReactNode } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Page.module.scss";

interface PageProps {
  children: ReactNode;
  className?: string;
}

export const Page: FC<PageProps> = ({ className, children }) => {
  return (
    <section className={classNames(cls.Page, {}, [className])}>
      {children}
    </section>
  );
};
