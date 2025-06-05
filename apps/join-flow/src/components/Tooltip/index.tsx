import React, { ReactNode } from "react";

export interface TooltipProps {
  content: ReactNode;
  gap?: number;
  placement?: "right" | "left" | "top" | "bottom";
  children: ReactNode;
  className?: string;
}

export const ToolTip = ({
  content,
  gap = 8,
  placement = "right",
  children,
  className = "",
}: TooltipProps) => {
  let tooltipPositionStyles = "";
  let translateStyles = "";

  switch (placement) {
    case "right":
      tooltipPositionStyles = `left-full top-1/2`;
      translateStyles = `-translate-y-1/2`;
      break;
    case "left":
      tooltipPositionStyles = `right-full top-1/2`;
      translateStyles = `-translate-y-1/2`;
      break;
    case "top":
      tooltipPositionStyles = `bottom-full left-1/2`;
      translateStyles = `-translate-x-1/2`;
      break;
    case "bottom":
      tooltipPositionStyles = `top-full left-1/2`;
      translateStyles = `-translate-x-1/2`;
      break;
    default:
      tooltipPositionStyles = `left-full top-1/2`;
      translateStyles = `-translate-y-1/2`;
  }

  // Inline style for gap
  const gapStyle =
    placement === "right"
      ? { marginLeft: gap }
      : placement === "left"
        ? { marginRight: gap }
        : placement === "top"
          ? { marginBottom: gap }
          : { marginTop: gap };

  return (
    <span className="relative group inline-flex items-center">
      {children}
      <span
        className={`absolute ${tooltipPositionStyles} ${translateStyles} bg-core-grey-200 md:w-[180px] lg:w-[230px] rounded-sm p-4 z-20 opacity-0 pointer-events-auto transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 hover:opacity-100 ${className}`}
        style={gapStyle}
        tabIndex={-1}
      >
        <span className="text-white text-xxs font-normal leading-5 shadow">
          {content}
        </span>
      </span>
    </span>
  );
};
