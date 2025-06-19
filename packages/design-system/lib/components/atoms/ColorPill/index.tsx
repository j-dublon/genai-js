import { BackgroundColors } from "@lib/types";
import { bgColorVariants } from "@lib/variants";
import cx from "classnames";

const sizeVariants = {
  extraSmall: {
    container: "ds:px-2 ds:py-1",
    text: "ds:text-xxs",
  },
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
  size: "extraSmall" | "small" | "medium" | "large";
  className?: string;
  whiteText?: boolean;
  noPadding?: boolean;
  icon?: React.ReactNode;
  textClassName?: string;
}

export const ColorPill = ({
  colorPillText,
  backgroundColor,
  ariaLabel,
  size,
  className = "",
  whiteText = false,
  noPadding = false,
  icon,
  textClassName = "",
}: ColorPillProps) => {
  return (
    <div
      className={cx(
        "ds:flex ds:flex-row ds:gap-1 ds:items-center ds:rounded-xl ds:w-fit",
        !noPadding && sizeVariants[size].container,
        `${bgColorVariants[backgroundColor]}`,
        className,
      )}
      aria-label={`Color pill with the text ${colorPillText}`}
    >
      {icon && (
        <div className="ds:flex ds:items-center ds:justify-center ds:mr-1">
          {icon}
        </div>
      )}
      <h1
        className={cx(
          "ds:font-semibold",
          sizeVariants[size].text,
          whiteText ? "ds:text-core-white" : "ds:text-core-black",
          textClassName,
        )}
        aria-label={ariaLabel ? ariaLabel : `Color pill text ${colorPillText}`}
      >
        {colorPillText}
      </h1>
    </div>
  );
};
