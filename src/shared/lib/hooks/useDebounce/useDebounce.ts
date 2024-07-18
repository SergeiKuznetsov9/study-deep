import { useCallback, useRef } from "react";

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  let timerId = useRef<ReturnType<typeof setTimeout>>();

  return useCallback(
    (...args: any[]) => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      timerId.current = setTimeout(() => callback(...args), delay);
    },

    [callback, delay]
  );
}
