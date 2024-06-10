import { MutableRefObject, useEffect, useRef } from "react";

export interface UseInfiniteScrollOptions {
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
  callback?: () => void;
}

export function useInfiniteScroll({
  triggerRef,
  wrapperRef,
  callback,
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;

    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: "0px",
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.observe(triggerElement);
    }

    return () => {
      if (observer && triggerElement) {
        observer.unobserve(triggerElement);
      }
    };
  }, [triggerRef, wrapperRef, callback]);
}
