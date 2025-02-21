import { BackgroundColors } from "@lib/types";
import { bgColorVariants } from "@lib/variants";
import cx from "classnames";

const sizeVariants = {
  small: {
    container: "px-2 md:px-3 py-1",
    text: "text-xs md:text-sm",
  },
  medium: {
    container: "px-3 md:px-4 py-1",
    text: "text-sm md:text-[26px]",
  },
  large: {
    container: "px-5 py-1 md:py-2",
    text: "md:text-5xl text-2xl",
  },
};

export interface ColorPillProps {
  colorPillText: string;
  backgroundColor: BackgroundColors;
  ariaLabel?: string;
  size: "small" | "medium" | "large";
}

export const ColorPill = ({
  colorPillText,
  backgroundColor,
  ariaLabel,
  size,
}: ColorPillProps) => {
  return (
    <div
      className={cx(
        "flex items-center rounded-xl w-fit",
        sizeVariants[size].container,
        `${bgColorVariants[backgroundColor]}`,
      )}
      aria-label={`Color pill with the text ${colorPillText}`}
    >
      <h1
        className={cx("font-semibold", sizeVariants[size].text)}
        aria-label={ariaLabel ? ariaLabel : `Color pill text ${colorPillText}`}
      >
        {colorPillText}
      </h1>
    </div>
  );
};
