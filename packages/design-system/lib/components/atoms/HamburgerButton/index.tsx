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
  color = "black",
  borderColor = "rgba(0, 0, 0, 0.15)",
}: HamburgerButtonProps) => {
  return (
    <button
      onClick={() => setActive((pv) => !pv)}
      className={cx(
        "ds:relative ds:flex ds:shrink-0 ds:flex-col ds:items-center ds:justify-center ds:gap-1 ds:rounded-full ds:border-1 ds:transition-all ds:duration-200",
        className,
      )}
      style={{ width, height, backgroundColor: fill, borderColor }}
      aria-expanded={active}
      aria-label={active ? "Close menu" : "Open menu"}
    >
      <span
        className={cx(
          "ds:absolute ds:left-1/2 ds:block ds:h-0.5 ds:w-5 ds:-translate-x-1/2 ds:-translate-y-1/2 ds:transition-all ds:duration-200",
          active ? "ds:top-1/2 ds:rotate-45" : "ds:top-[35%]",
        )}
        style={{ backgroundColor: color }}
      />
      <span
        className={cx(
          "ds:absolute ds:left-1/2 ds:top-1/2 ds:block ds:h-0.5 ds:w-5 ds:-translate-x-1/2 ds:-translate-y-1/2 ds:transition-all ds:duration-200",
          active ? "ds:-rotate-45" : "",
        )}
        style={{ backgroundColor: color }}
      />
      <span
        className={cx(
          "ds:absolute ds:left-1/2 ds:block ds:h-0.5 ds:w-5 ds:-translate-x-1/2 ds:transition-all ds:duration-200",
          active
            ? "ds:top-1/2 ds:-translate-y-1/2 ds:rotate-45"
            : "ds:top-[62%] ds:translate-y-0",
        )}
        style={{ backgroundColor: color }}
      />
    </button>
  );
};
