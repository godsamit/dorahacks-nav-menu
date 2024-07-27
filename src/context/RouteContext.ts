import { createContext, Dispatch, SetStateAction } from "react";

type RouteContextType = {
  route: string;
  setRoute: Dispatch<SetStateAction<string>>;
}

export const RouteContext = createContext<RouteContextType>({
  route: "",
  setRoute: () => {}
});