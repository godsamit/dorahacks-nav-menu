import { createContext, useState, useEffect } from "react";

export const MediaQueryContext = createContext<boolean | undefined>(undefined);

export function MediaQueryProvider ({ query, children }: { query: string, children: React.ReactNode }) {
  const [matches, setMatches] = useState<boolean>(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return (
    <MediaQueryContext.Provider value={matches}>
      {children}
    </MediaQueryContext.Provider>
  );
}
