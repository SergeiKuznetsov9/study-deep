import {
  FC,
  MutableRefObject,
  ReactNode,
  memo,
  useRef,
  UIEvent,
  useEffect,
} from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Page.module.scss";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { pageActions } from "../model/slices/pageSlice";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPageScrollByPath } from "../model/selectors/pageSelectors";
import { StateSchema } from "app/providers/StoreProvider";
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle";

interface PageProps {
  children: ReactNode;
  className?: string;
  onScrollEnd?: () => void;
}

export const Page: FC<PageProps> = memo(
  ({ className, children, onScrollEnd }) => {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) =>
      getPageScrollByPath(state, pathname)
    );

    const dispatch = useAppDispatch();

    useInfiniteScroll({
      triggerRef,
      wrapperRef,
      callback: onScrollEnd,
    });

    const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
      dispatch(
        pageActions.setScrollPosition({
          path: pathname,
          position: event.currentTarget.scrollTop,
        })
      );
    }, 1000);
    useEffect(() => {
      wrapperRef.current.scrollTop = scrollPosition;
    }, []);

    return (
      <section
        className={classNames(cls.Page, {}, [className])}
        ref={wrapperRef}
        onScroll={onScroll}
      >
        {children}
        {onScrollEnd && <div className={cls.trigger} ref={triggerRef} />}
      </section>
    );
  }
);
