import {
  FC,
  MutableRefObject,
  ReactNode,
  memo,
  useRef,
  useEffect,
} from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Page.module.scss";
import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { pageActions } from "../model/slices/pageSlice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPageScrollByPath } from "../model/selectors/pageSelectors";
import { StateSchema } from "@/app/providers/StoreProvider";
import { useThrottle } from "@/shared/lib/hooks/useThrottle/useThrottle";

interface PageProps {
  children: ReactNode;
  className?: string;
  onScrollEnd?: () => void;
  setIsIntersecting?: (isIntersecting: boolean) => void;
}

export const Page: FC<PageProps> = memo(
  ({ className, children, onScrollEnd, setIsIntersecting }) => {
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) =>
      getPageScrollByPath(state, pathname)
    );

    const dispatch = useAppDispatch();

    const isIntersecting = useInfiniteScroll({
      triggerRef,
      wrapperRef: undefined,
      callback: onScrollEnd,
    });

    const scrollHandler = useThrottle((event: Event) => {
      const scrollTop = (event.target as Document).scrollingElement?.scrollTop;

      dispatch(
        pageActions.setScrollPosition({
          path: pathname,
          position: scrollTop ?? 0,
        })
      );
    }, 100);

    useEffect(() => {
      document.addEventListener("scroll", scrollHandler);
      return () => document.removeEventListener("scroll", scrollHandler);
    }, []);

    useEffect(() => {
      setIsIntersecting?.(isIntersecting);
    }, [isIntersecting]);

    useEffect(() => {
      document!.firstElementChild!.scrollTop = scrollPosition;
    }, []);

    return (
      <main className={classNames(cls.Page, {}, [className])}>
        {children}
        {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
      </main>
    );
  }
);
