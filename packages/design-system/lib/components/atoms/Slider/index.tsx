import { useScrollable } from "@hooks/useScrollable";
import cx from "classnames";
import React, { useEffect, useRef, useState } from "react";

export interface SliderProps {
  children: React.ReactNode;
  draggable?: boolean;
  margin?: string;
}

export const Slider = ({
  draggable = false,
  margin = "",
  children,
}: SliderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrollable, setIsScrollable] = useState(false);

  const { isMouseDown, onMouseDown, onMouseUp, onMouseMove } =
    useScrollable(ref);

  useEffect(() => {
    const slider = ref.current;
    if (!slider) return;

    const handleScrollAndCheck = () => {
      const needsScrolling = slider.scrollWidth > slider.clientWidth;
      setIsScrollable(needsScrolling);

      if (needsScrolling) {
        const scrollbar = document.querySelector('[role="scrollbar"]');
        if (!scrollbar) return;

        const available = slider.scrollWidth - slider.clientWidth;
        const progress = available ? slider.scrollLeft / available : 0;
        setScrollPosition(progress * (scrollbar.clientWidth - 368));
      }
    };

    handleScrollAndCheck();
    slider.addEventListener("scroll", handleScrollAndCheck);
    const resizeObserver = new ResizeObserver(handleScrollAndCheck);
    resizeObserver.observe(slider);

    return () => {
      slider.removeEventListener("scroll", handleScrollAndCheck);
      resizeObserver.disconnect();
    };
  }, []);

  const baseStyles = `${draggable ? "select-none user-select-none" : undefined}
    flex overflow-x-auto relative h-fit scrollbar-none py-5`;

  const marginStyles = `${margin ?? ""} after:flex-none after:w-10`;

  const dragStyles = isMouseDown ? "cursor-grabbing" : "cursor-grab";

  return (
    <div className="relative">
      <div
        role="region"
        aria-roledescription="slider"
        aria-label="Scrollable content"
        ref={ref}
        className={cx(baseStyles, marginStyles, draggable ? dragStyles : "")}
        onMouseDown={draggable ? onMouseDown : undefined}
        onMouseUp={draggable ? onMouseUp : undefined}
        onMouseMove={draggable ? onMouseMove : undefined}
      >
        {React.Children.map(children, (child, i) => (
          <div
            role="group"
            aria-roledescription="slide"
            className={`slider-item ${i === 0 ? "" : "ml-4 md:ml-6"}`}
          >
            {child}
          </div>
        ))}
      </div>

      {isScrollable && (
        <div className="md:pt-17 px-5 lg:px-36">
          <div
            role="scrollbar"
            aria-orientation="horizontal"
            aria-controls="slider"
            aria-label="Scroll indicator"
            className="h-1 bg-ui-grey-200 mx-auto md:max-w-[956px] lg:max-w-[1152px] hidden md:block relative"
          >
            <div
              role="thumb"
              aria-label="Scroll position"
              className="bg-core-black h-1 w-[368px] rounded-full"
              style={{
                transform: `translateX(${scrollPosition}px)`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
