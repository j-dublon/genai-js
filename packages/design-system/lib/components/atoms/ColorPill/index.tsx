import { BackgroundColors } from "@lib/types";
import { bgColorVariants } from "@lib/variants";
import cx from "classnames";

const sizeVariants = {
  small: {
    container: "ds:px-2 ds:md:px-3 ds:py-1",
    text: "ds:text-sm",
  },
  medium: {
    container: "ds:px-4 ds:md:px-6 ds:py-2",
    text: "ds:text-md ds:md:text-[26px]",
  },
  large: {
    container: "ds:px-5 ds:py-1 ds:md:py-2",
    text: "ds:md:text-5xl ds:text-2xl",
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
        "ds:flex ds:items-center ds:rounded-xl ds:w-fit",
        sizeVariants[size].container,
        `${bgColorVariants[backgroundColor]}`,
      )}
      aria-label={`Color pill with the text ${colorPillText}`}
    >
      <h1
        className={cx("ds:font-semibold", sizeVariants[size].text)}
        aria-label={ariaLabel ? ariaLabel : `Color pill text ${colorPillText}`}
      >
        {colorPillText}
      </h1>
    </div>
  );
};
