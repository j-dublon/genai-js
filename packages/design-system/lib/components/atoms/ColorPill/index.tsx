import cx from "classnames";
import { BackgroundColors } from "@lib/types";

export interface ColorPillProps {
  colorPillText: string;
  backgroundColor: BackgroundColors;
  ariaLabel?: string;
}

export const ColorPill = ({
  colorPillText,
  backgroundColor,
  ariaLabel,
}: ColorPillProps) => {
  const bgColorVariants = {
    pink: "bg-core-pink",
    yellow: "bg-core-yellow",
    grey: "bg-ui-grey-300",
    orange: "bg-secondary-orange",
    blue: "bg-core-blue",
  };

  return (
    <div
      className={cx(
        "flex items-center px-2 rounded-xl w-fit",
        `${bgColorVariants[backgroundColor]}`,
      )}
      aria-label={`Color pill with the text ${colorPillText}`}
    >
      <h1
        className="md:text-5xl text-2xl md:p-3 p-2 font-semibold"
        aria-label={ariaLabel ? ariaLabel : `Color pill text ${colorPillText}`}
      >
        {colorPillText}
      </h1>
    </div>
  );
};
