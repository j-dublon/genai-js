import cx from "classnames";
import { Dispatch, SetStateAction } from "react";

interface HamburgerButtonProps {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  color?: string;
  borderColor?: string;
}

export const HamburgerButton = ({
  active,
  setActive,
  className,
  width = 44,
  height = 44,
  fill = "transparent",
  stroke = "currentColor",
  strokeWidth = 2,
  color = "black",
  borderColor = "rgba(0, 0, 0, 0.15)",
}: HamburgerButtonProps) => {
  return (
    <button
      onClick={() => setActive((pv) => !pv)}
      className={cx(
        "relative flex shrink-0 flex-col items-center justify-center gap-1 rounded-full border-2 transition-all duration-200",
        className,
      )}
      style={{ width, height, backgroundColor: fill, borderColor }}
      aria-expanded={active}
      aria-label={active ? "Close menu" : "Open menu"}
    >
      <span
        className={cx(
          "absolute left-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
          active ? "top-1/2 rotate-45" : "top-[35%]",
        )}
        style={{ backgroundColor: color, stroke, strokeWidth }}
      />
      <span
        className={cx(
          "absolute left-1/2 top-1/2 block h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
          active ? "-rotate-45" : "",
        )}
        style={{ backgroundColor: color, stroke, strokeWidth }}
      />
      <span
        className={cx(
          "absolute left-1/2 block h-0.5 w-5 -translate-x-1/2 transition-all duration-200",
          active
            ? "top-1/2 -translate-y-1/2 rotate-45"
            : "top-[65%] translate-y-0",
        )}
        style={{ backgroundColor: color, stroke, strokeWidth }}
      />
    </button>
  );
};
