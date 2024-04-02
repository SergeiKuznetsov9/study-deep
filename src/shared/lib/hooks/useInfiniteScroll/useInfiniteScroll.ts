import { MutableRefObject, useEffect, useRef } from "react";

export interface UseInfiniteScrollOptions {
  // реф на элемент, который будет пересекать область видимости
  triggerRef: MutableRefObject<HTMLElement>;
  // реф на обертку, внутри который находится скролл
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

    // Полученные пропсами рефы нужно замкнуть, поскольку отписка происходит в тот момент,
    // когда компонент будет уничтожен и они превратятся в null. Это вызовет ошибку
    const wrapperElement = wrapperRef.current;
    const triggerElement = triggerRef.current;

    if (callback) {
      const options = {
        // в этой настройке указывается элемент, в которой находится скролл
        root: wrapperElement,
        rootMargin: "0px",
        threshold: 1.0,
      };

      // callback, переданный в конструктор будет вызван тогда, когда на экране появиться
      // элемент, за которым ведется наблюдение
      // первый его аргумент - это массив элементов, за которыми ведется наблюдение
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      // После создания сущности обзервера, нужно вызывать у него метод, указав за чем мы
      // будем следить
      observer.observe(triggerElement);
    }

    // При размонтировании нужно перестать вести наблюдение
    return () => {
      if (observer && triggerElement) {
        observer.unobserve(triggerElement);
      }
    };
  }, [triggerRef, wrapperRef, callback]);
}
