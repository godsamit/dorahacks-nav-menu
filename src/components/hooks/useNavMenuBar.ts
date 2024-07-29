// Custom hook to implement a roving index and manages keyboard controls

import { useState } from "react";

export function useNavMenuBar(options: unknown[]) {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleKeyDown = (e) => {
    console.log(e);
    e.stopPropagation();
    switch (e.code) {
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
        break;
    }
  }

  return [currentIndex, handleKeyDown];
}