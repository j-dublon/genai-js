import cx from "classnames";

export interface ColourPillProps {
  colourPillText: string;
  backgroundColor?: string;
  ariaLabel?: string;
}

export const ColourPill: React.FC<ColourPillProps> = ({
  colourPillText,
  backgroundColor,
  ariaLabel,
}) => {
  return (
    <div
      className={cx("flex items-center px-2 rounded-xl w-fit", backgroundColor)}
      aria-label={`Colour pill with the text ${colourPillText}`}
    >
      <p
        className="text-xs md:text-[16px] p-1 font-bold"
        aria-label={
          ariaLabel ? ariaLabel : `Colour pill text ${colourPillText}`
        }
      >
        {colourPillText}
      </p>
    </div>
  );
};

ColourPill.displayName = "ColourPill";
