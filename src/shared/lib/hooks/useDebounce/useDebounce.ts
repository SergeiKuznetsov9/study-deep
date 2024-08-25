import { useCallback, useRef } from "react";

export function useDebounce(callback: (...args: unknown[]) => void, delay: number) {
  const timerId = useRef<ReturnType<typeof setTimeout>>();

  return useCallback(
    (...args: unknown[]) => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      timerId.current = setTimeout(() => callback(...args), delay);
    },

    [callback, delay]
  );
}
