import { useContext } from "react";
import { MediaQueryContext } from "../../context";

export function useMediaQueryContext () {
  const context = useContext(MediaQueryContext);
  if (context === undefined) {
    throw new Error("useMediaQueryContext must be used within a MediaQueryProvider");
  }
  return context;
}
