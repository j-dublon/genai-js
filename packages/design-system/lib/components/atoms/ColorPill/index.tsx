import { BackgroundColors } from "@lib/types";
import { bgColorVariants } from "@lib/variants";
import cx from "classnames";

export interface ColorPillProps {
  colorPillText: string;
  backgroundColor: BackgroundColors;
  ariaLabel?: string;
  className?: string;
}

export const ColorPill = ({
  colorPillText,
  backgroundColor,
  ariaLabel,
  className,
}: ColorPillProps) => {
  return (
    <div
      className={cx(
        "flex items-center px-2 rounded-xl w-fit",
        `${bgColorVariants[backgroundColor]}`,
      )}
      aria-label={`Color pill with the text ${colorPillText}`}
    >
      <h1
        className={cx("md:p-3 p-2 font-semibold", className)}
        aria-label={ariaLabel ? ariaLabel : `Color pill text ${colorPillText}`}
      >
        {colorPillText}
      </h1>
    </div>
  );
};
