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

  // factor for how much the extra drag moves the content visually
  // negative so it moves in a direction that makes sense for the content
  const resistance = -0.1;

  const onMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
    setStartX(e.pageX - ref.current!.offsetLeft);
    setScrollLeft(ref.current!.scrollLeft);
    if (ref.current) {
      ref.current.style.transition = "";
      ref.current.style.transform = "";
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    const desiredScroll = scrollLeft - walk;
    const maxScroll = ref.current.scrollWidth - ref.current.clientWidth;

    if (desiredScroll < 0) {
      ref.current.scrollLeft = 0;
      const overscroll = desiredScroll; // negative value
      ref.current.style.transform = `translateX(${overscroll * resistance}px)`;
    } else if (desiredScroll > maxScroll) {
      ref.current.scrollLeft = maxScroll;
      const overscroll = desiredScroll - maxScroll; // positive value
      ref.current.style.transform = `translateX(${overscroll * resistance}px)`;
    } else {
      ref.current.style.transform = `translateX(0px)`;
      ref.current.scrollLeft = desiredScroll;
    }
  };

  // animate the transform back to 0 to "bounce" the content back
  const animateTransform = (
    element: HTMLDivElement,
    from: number,
    to: number,
    duration: number,
  ) => {
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = from + (to - from) * (1 - Math.pow(1 - progress, 2));
      element.style.transform = `translateX(${current}px)`;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.transform = "";
      }
    };

    requestAnimationFrame(animate);
  };

  const onMouseUp = () => {
    if (ref.current) {
      const computed = window.getComputedStyle(ref.current);
      const matrix = new DOMMatrixReadOnly(computed.transform);
      const currentOffset = matrix.m41; // translateX value
      if (currentOffset !== 0) {
        animateTransform(ref.current, currentOffset, 0, 300);
      }
    }
    setIsMouseDown(false);
  };

  return { isMouseDown, onMouseDown, onMouseUp, onMouseMove };
};
