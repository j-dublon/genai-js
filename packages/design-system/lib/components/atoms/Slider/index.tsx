import React, { JSX, useRef, useState } from "react";

interface SliderProps {
  children: React.ReactNode;
  draggable?: boolean;
  hasSetCardWidth?: boolean;
  visibleCards?: 1 | 2 | 3;
}

const useScrollable = (ref: React.RefObject<HTMLDivElement>) => {
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
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - ref.current!.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current!.scrollLeft = scrollLeft - walk;
  };

  return { isMouseDown, onMouseDown, onMouseUp, onMouseMove };
};

export const Slider = ({
  draggable = false,
  hasSetCardWidth = false,
  visibleCards = 3,
  children,
}: SliderProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const { isMouseDown, onMouseDown, onMouseUp, onMouseMove } =
    useScrollable(ref);

  const baseStyles = `
    select-none user-select-none
    flex overflow-x-auto relative
    [&::-webkit-scrollbar]:h-0.5 py-10
    [&::-webkit-scrollbar-thumb]:bg-black
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-track]:bg-ui-grey-200
  `;

  const marginStyles = `
    before:flex-none before:w-4 after:flex-none after:w-4
    sm:before:w-6 sm:after:w-6
    md:before:w-8 md:after:w-8
    lg:before:w-12 lg:after:w-12
    xl:before:w-[calc((100vw-1280px)/2)] xl:after:w-[calc((100vw-1280px)/2)]
  `;

  const dragStyles = isMouseDown ? "cursor-grabbing" : "cursor-grab";

  return (
    <div
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
      {React.Children.map(children, (child) => (
        <div className="slider-item last:mr-0">{child}</div>
      ))}
    </div>
  );
};
