// Custom hook that builds on useNavMenuBar to introduce more nuanced behavior for sub menus
// All behaviors follow the web a11y specification on: https://www.w3.org/WAI/ARIA/apg/patterns/menubar/

import { FocusEventHandler, KeyboardEventHandler, MouseEventHandler, RefObject, useState } from "react";
import { useNavMenuBar } from "./useNavMenuBar";
import { useMediaQueryContext } from "./useMediaQueryContext";

type SubMenuReturnType = [boolean, number, {
  handleMouseEnter: () => void,
  handleMouseLeave: () => void,
  handleClick: MouseEventHandler<HTMLLIElement>,
  handleFocus: FocusEventHandler<HTMLLIElement>,
  handleBlur: FocusEventHandler<HTMLLIElement>,
  handleKeyDown: KeyboardEventHandler<HTMLLIElement>,
}]

// needs the triggerRef to go back to when the subMenu loses focus.
// subMenuDirection is the direction where the subMenu is opened, and arrow keys will function differently
export function useSubMenu(
  options: unknown[], 
  triggerRef: RefObject<HTMLButtonElement>, 
  subMenuDirection: "vertical" | "horizontal"
): SubMenuReturnType {
  const [currentIndex, handleNavBarKeyDown, { goToPrev, goToNext, goToEnd }] = useNavMenuBar(options)

  const [open, setOpen] = useState(false);

  const isLargeScreen = useMediaQueryContext();

  const handleMouseEnter = () => isLargeScreen ? setOpen(true) : null;
  const handleMouseLeave = () => isLargeScreen ? setOpen(false) : null;
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleFocus = (e: React.FocusEvent) => {
    e.stopPropagation();
    const relatedTarget = e.relatedTarget as HTMLElement;
    const target = e.target as HTMLElement;
    const relatedDepth = relatedTarget?.dataset?.depth;
    const targetDepth = target?.dataset?.depth
    // if navigating from a deeper element, subMenu needs to stay open, per ARIA specification 
    if (relatedDepth && targetDepth && relatedDepth > targetDepth) {
      setOpen(true);
    }
  }

  const handleBlur = (e: React.FocusEvent) => {
    if (isLargeScreen) {
      const currentTarget = e.currentTarget as HTMLElement;
      if (!currentTarget.contains(e.relatedTarget as Node)) {
        setOpen(false);
      }
    }
  };

  const openSubMenu = (e: React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
  };
  const closeSubMenu = (e: React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
            openSubMenu(e);
            goToEnd();
            break;
        }
      }

      if (subMenuDirection === "horizontal") {
        switch(e.code) {
          case "ArrowRight": 
            openSubMenu(e);
            break;
          case "ArrowLeft":
            openSubMenu(e);
            goToEnd();
            break;
        }
      }
      return;
    } else {
      if (subMenuDirection === "vertical") {
        switch(e.code) {
          case "ArrowLeft":
          case "ArrowRight":
            return;
        }
      }

      if (subMenuDirection === "horizontal") {
        switch(e.code) {
          case "ArrowRight": 
            openSubMenu(e);
            break;
          case "ArrowLeft":
            triggerRef.current?.focus();
            closeSubMenu(e);
            break;
        }
      }

      switch(e.code) {
        case "ArrowUp":
          e.stopPropagation();
          e.preventDefault();
          goToPrev();
          break;
        case "ArrowDown": 
          e.stopPropagation();
          e.preventDefault();
          goToNext();
          break;
        case "Escape": 
          triggerRef.current?.focus();
          closeSubMenu(e);
          break;
      }
      handleNavBarKeyDown(e);
    }
  };

  return [open, currentIndex, {
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleFocus,
    handleBlur,
    handleKeyDown,
  }]
}
