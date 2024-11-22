import { useRef, useCallback } from "react";

export const useDebounce = <F extends (...args: never[]) => void>(
  fn: F,
  delay = 500
) => {
  const timeout = useRef<NodeJS.Timeout>();

  const debouncedFunction = useCallback(
    (...args: Parameters<F>) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  return debouncedFunction;
};
