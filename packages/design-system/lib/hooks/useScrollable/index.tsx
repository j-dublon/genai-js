import { useState } from "react";

/**
 * Hook that enables drag-to-scroll functionality for a container element
 * @param ref Reference to scrollable container element
 * @returns Object containing mouse state and event handlers for drag scrolling
 * @property {boolean} isMouseDown - Whether mouse is currently pressed
 * @property {function} onMouseDown - Handler for mouse down events
 * @property {function} onMouseUp - Handler for mouse up events
 * @property {function} onMouseMove - Handler for mouse move events
 */
export const useScrollable = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setStartX(e.pageX - ref.current!.offsetLeft);
    setScrollLeft(ref.current!.scrollLeft);
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return { isMouseDown, onMouseDown, onMouseUp, onMouseMove };
};
