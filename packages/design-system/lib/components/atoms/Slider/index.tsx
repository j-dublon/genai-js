import { useScrollable } from "@hooks/useScrollable";
import React, { useRef } from "react";

export interface SliderProps {
  children: React.ReactNode;
  draggable?: boolean;
  showScrollbar?: boolean;
}

export const Slider = ({
  draggable = false,
  showScrollbar = true,
  children,
}: SliderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const { isMouseDown, onMouseDown, onMouseUp, onMouseMove } =
    useScrollable(ref);

  const scrollbarStyles = showScrollbar
    ? `
      scrollbar scrollbar-thin scrollbar-thumb-core-black scrollbar-track-ui-grey-300
      hover:scrollbar-thumb-core-black/90
    `
    : `scrollbar-none`;

  const baseStyles = `
    ${draggable ? "select-none user-select-none" : undefined}
    flex overflow-x-auto relative md:h-[500px] h-fit
    ${scrollbarStyles}
  `;

  const marginStyles = `
    before:flex-none after:flex-none after:w-4
    sm:before:w-6 sm:after:w-6
    md:before:w-8 md:after:w-8
    lg:before:w-2 lg:after:w-12
  `;

  const dragStyles = isMouseDown ? "cursor-grabbing" : "cursor-grab";

  return (
    <div
      role="region"
      aria-roledescription="slider"
      aria-label="Scrollable content"
      ref={ref}
      className={`
        ${baseStyles}
        ${marginStyles}
        ${draggable ? dragStyles : ""}
      `}
      onMouseDown={draggable ? onMouseDown : undefined}
      onMouseUp={draggable ? onMouseUp : undefined}
      onMouseMove={draggable ? onMouseMove : undefined}
    >
      {React.Children.map(children, (child, i) => (
        <div
          role="group"
          aria-roledescription="slide"
          className={`slider-item flex-none ${i === 0 ? "" : "ml-8"}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
