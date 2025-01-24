import { useState } from "react";

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
