import { useScrollable } from "@hooks/useScrollable";
import { TrustpilotHorizontal } from "@lib/index.client";
import cx from "classnames";
import React, { useEffect, useRef, useState } from "react";

export interface SliderProps {
  children: React.ReactNode;
  draggable?: boolean;
  margin?: string;
  trustScore?: number;
  numberOfReviews?: number;
  sectionName?: string;
}

export const Slider = ({
  draggable = false,
  margin = "",
  trustScore = undefined,
  numberOfReviews = undefined,
  children,
  sectionName = "slider",
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

  const baseStyles = `${draggable ? "ds:select-none ds:user-select-none" : undefined}
    ds:flex ds:overflow-x-auto ds:relative ds:h-fit ds:scrollbar-none ds:py-5`;

  const marginStyles = cx(margin, "ds:after:flex-none ds:after:w-10");

  const dragStyles = isMouseDown ? "ds:cursor-grabbing" : "ds:cursor-grab";

  return (
    <div className="ds:relative">
      <div
        id="slider"
        role="region"
        aria-roledescription="slider"
        aria-label={"Scrollable content for " + sectionName}
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
            className={`slider-item ${i === 0 ? "" : "ds:ml-4 ds:md:ml-6"}`}
          >
            {child}
          </div>
        ))}
      </div>

      {trustScore !== undefined && (
        <div className="ds:px-mobile ds:sm:px-tablet ds:lg:px-desktop">
          <div className="ds:md:pt-16 ds:max-w-[1152px] ds:mx-auto">
            <TrustpilotHorizontal
              trustScore={trustScore}
              numberOfReviews={numberOfReviews}
            />
          </div>
        </div>
      )}

      {isScrollable && (
        <div className="ds:md:pt-17 ds:px-mobile ds:sm:px-tablet ds:lg:px-desktop">
          <div
            role="scrollbar"
            aria-orientation="horizontal"
            aria-controls="slider"
            aria-label="Scroll indicator"
            aria-valuenow={scrollPosition}
            className="ds:h-1 ds:bg-ui-grey-300 ds:mx-auto ds:md:max-w-[956px] ds:lg:max-w-[1152px] ds:hidden ds:md:block ds:relative"
          >
            <div
              aria-hidden="true"
              className="ds:bg-core-black ds:h-1 ds:w-[368px] ds:rounded-full"
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
