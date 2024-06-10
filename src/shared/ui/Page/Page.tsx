import { FC, MutableRefObject, ReactNode, memo, useRef } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Page.module.scss";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";

interface PageProps {
  children: ReactNode;
  className?: string;
  onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = memo(
  ({ className, children, onScrollEnd }) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    useInfiniteScroll({
      triggerRef,
      wrapperRef,
      callback: onScrollEnd,
    });

    return (
      <section
        className={classNames(cls.Page, {}, [className])}
        ref={wrapperRef}
      >
        {children}
        <div ref={triggerRef} />
      </section>
    );
  }
);
