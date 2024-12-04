import { useCallback, useRef } from "react";

export function useThrottle(callback: (arg: Event) => void, delay: number) {
  const throttleRef = useRef<ReturnType<typeof setTimeout>>();
  return useCallback(
    (arg: Event) => {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current);
      }

      throttleRef.current = setTimeout(() => {
        callback(arg);
      }, delay);
    },
    [callback, delay]
  );
}
