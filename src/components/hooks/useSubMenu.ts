// Custom hook that builds on useNavMenuBar to introduce more nuanced behavior for sub menus
// All behaviors follow the web a11y specification on: https://www.w3.org/WAI/ARIA/apg/patterns/menubar/

import { RefObject, useState } from "react";
import { useNavMenuBar } from "./useNavMenuBar";

type SubMenuReturnType = [boolean, number, {
  handleMouseEnter: () => void,
  handleMouseLeave: () => void,
  handleBlur: (e: FocusEvent) => void,
  handleKeyDown: (e: KeyboardEvent) => void,
}]

// needs the triggerRef to go back to when the subMenu loses focus.
// subMenuDirection is the direction where the subMenu is opened, and arrow keys will function differently
export function useSubMenu(
  options: unknown[], 
  triggerRef: RefObject<HTMLButtonElement>, 
  subMenuDirection: "vertical" | "horizontal"
): SubMenuReturnType {
  const [currentIndex, handleNavBarKeyDown, { goToEnd }] = useNavMenuBar(options)
  const [open, setOpen] = useState(false);

  const handleMouseEnter = () => setOpen(true);

  const handleMouseLeave = () => setOpen(false);

  const handleBlur = (e: FocusEvent) => {
    const currentTarget = e.currentTarget as HTMLElement;
    if (!currentTarget.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  }

  const openSubMenu = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  }

  const closeSubMenu = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      switch(e.code) {
        case "Enter":
        case "Space":
          openSubMenu(e);
          break;
      }
      if (subMenuDirection === "vertical") {
        switch(e.code) {
          case "ArrowDown": 
            openSubMenu(e);
            break;
          case "ArrowUp":
            closeSubMenu(e);
            goToEnd()
            break;
        }
      }

      if (subMenuDirection === "horizontal") {
        switch(e.code) {
          case "ArrowRight": 
            openSubMenu(e);
            break;
          case "ArrowLeft":
            closeSubMenu(e);
            goToEnd();
            break;
        }
      }
      return;
    } else {
      switch(e.code) {
        case "ArrowLeft":
        case "ArrowRight":
          return;
        case "Escape": 
          closeSubMenu(e);
          triggerRef.current?.focus();
          break;
      }
      handleNavBarKeyDown(e);
    }
  }

  return [open, currentIndex, {
    handleMouseEnter,
    handleMouseLeave,
    handleBlur,
    handleKeyDown,
  }]

}