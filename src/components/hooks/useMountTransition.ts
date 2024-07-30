import { useEffect, useState } from "react";

export function useMountTransition (isMounted, unmountDelay) {
  const [hasTransitionedIn, setHasTransitionedIn] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (isMounted && !hasTransitionedIn) {
      setHasTransitionedIn(true);
    } else if (!isMounted && hasTransitionedIn) {
      timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
    }
    return () => {
      clearTimeout(timeoutId);
    }
  }, [unmountDelay, isMounted, hasTransitionedIn]);

  return hasTransitionedIn;
}
