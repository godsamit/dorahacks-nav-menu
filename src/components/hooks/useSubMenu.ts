import { useState } from "react";

export function useSubMenu(options: unknown[], triggerRef: unknown) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const goToStart = () => setCurrentIndex(0);

  const goToEnd = () => setCurrentIndex(options.length - 1);

  const goToPrev = () => {
    const index = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  }

  const goToNext = () => {
    const index = currentIndex === options.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  }

  const handleMouseEnter = () => setOpen(true);

  const handleMouseLeave = () => setOpen(false);

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  }

  const handleKeyDown = (e) => {
    console.log(document.activeElement)
    if (!open) {
      switch(e.code) {
        case "Enter":
        case "Space":
        case "ArrowDown":
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
          goToStart();
          break;
        case "ArrowUp": 
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
          goToEnd();
          break;
      }
      return;
    } else {
      e.stopPropagation();
      switch (e.code) {
        case "Escape": 
          e.preventDefault();
          setOpen(false);
          triggerRef.current.focus();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          goToPrev();
          break;
        case "ArrowRight":
        case "ArrowDown": 
          e.preventDefault();
          goToNext();
          break;
        case "End":
          e.preventDefault();
          goToEnd();
          break;
        case "Home":
          e.preventDefault();
          goToStart();
          break;
        default:
                // match(e);
        break;
      }
    }
  }

  return [open, currentIndex, {
    handleMouseEnter,
    handleMouseLeave,
    handleBlur,
    handleKeyDown,
  }]

}