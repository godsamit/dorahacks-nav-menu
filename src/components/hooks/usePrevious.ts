import { useEffect, useRef } from "react";

export function usePrevious(value: never) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
