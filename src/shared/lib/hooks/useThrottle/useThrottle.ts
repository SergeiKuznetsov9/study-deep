import { useCallback, useRef, UIEvent } from "react";

export function useThrottle(
  callback: (arg: UIEvent<HTMLDivElement>) => void,
  delay: number
) {
  const throttleRef = useRef(false);

  return useCallback(
    (arg: UIEvent<HTMLDivElement>) => {
      if (!throttleRef.current) {
        callback(arg);
        throttleRef.current = true;

        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay]
  );
}
