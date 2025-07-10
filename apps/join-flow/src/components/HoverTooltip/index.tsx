import { useCallback, useEffect, useRef, useState } from "react";

export const HoverTooltip = ({
  tooltipText,
  tooltipContent,
}: {
  tooltipText: string;
  tooltipContent: string;
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipHeight, setTooltipHeight] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    setIsVisible(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);


  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      setTooltipHeight(tooltipRef.current.offsetHeight);
    }
  }, [isVisible, tooltipContent]);

  const tooltipId = `${tooltipText
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")}-tooltip`;

  return (
    <div className="mt-6 hidden md:block">
      <div className="group cursor-help relative inline-block">
        <span
          className="text-sm text-core-black border-b border-dotted border-core-black"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          aria-describedby={tooltipId}
        >
          {tooltipText}
        </span>
        {/* Screen reader only tooltip content */}
        <span id={tooltipId} className="sr-only">
          {tooltipContent}
        </span>
        <div
          role="tooltip"
          ref={tooltipRef}
          className={`absolute z-50 bg-core-white border border-ui-grey-300 rounded-md p-2 md:p-3 shadow-lg min-w-100 pointer-events-none transition-opacity duration-150 ${
            isVisible ? "opacity-100" : "opacity-0 invisible"
          }`}
          style={{
            left: `${tooltipPosition.x + 10}px`,
            top: `${tooltipPosition.y - tooltipHeight / 2}px`,
          }}
        >
          <p className="text-xs md:text-sm text-black">{tooltipContent}</p>
        </div>
      </div>
    </div>
  );
};
