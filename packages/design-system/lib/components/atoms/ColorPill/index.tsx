import cx from "classnames";

export interface ColorPillProps {
  colorPillText: string;
  backgroundColor?: string;
  ariaLabel?: string;
}

export const ColorPill = ({
  colorPillText,
  backgroundColor,
  ariaLabel,
}: ColorPillProps) => {
  return (
    <div
      className={cx("flex items-center px-2 rounded-xl w-fit", backgroundColor)}
      aria-label={`Color pill with the text ${colorPillText}`}
    >
      <p
        className="md:text-4xl text-2xl md:p-3 p-2 font-semibold"
        aria-label={ariaLabel ? ariaLabel : `Color pill text ${colorPillText}`}
      >
        {colorPillText}
      </p>
    </div>
  );
};
