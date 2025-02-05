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

  const baseStyles = `
    ${draggable ? "select-none user-select-none" : undefined}
    flex overflow-x-auto relative md:min-h-[400px] min-h-[300px]
    ${
      showScrollbar
        ? `[&::-webkit-scrollbar]:h-0.5 py-5 mx-4
          [&::-webkit-scrollbar-thumb]:bg-black
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-track]:bg-ui-grey-200`
        : `[&::-webkit-scrollbar]:hidden`
    }
  `;

  const marginStyles = `
    before:flex-none after:flex-none after:w-4
    sm:before:w-6 sm:after:w-6
    md:before:w-8 md:after:w-8
    lg:before:w-12 lg:after:w-12
    xl:before:w-[calc((100vw-1280px)/2)] xl:after:w-[calc((100vw-1280px)/2)]
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
          className={`slider-item ${i === 0 ? "" : "ml-8"}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
