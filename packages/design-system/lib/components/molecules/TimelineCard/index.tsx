import { ColorPill } from "@components/atoms/ColorPill";
import { BackgroundColors } from "@lib/types";

export interface TimelineCardProps {
  className?: string;
  colorPillText: string;
  backgroundColor: BackgroundColors;
  subtitleText: string;
  subHeading: string;
  iconUrl?: string;
  colorPillSize?: "extraSmall" | "small" | "medium" | "large";
}

export const TimelineCard = ({
  className,
  colorPillText,
  backgroundColor,
  subtitleText,
  subHeading,
  iconUrl,
  colorPillSize = "medium",
}: TimelineCardProps) => {
  return (
    <div
      className={`ds:p-4 ds:pb-8 ds:md:p-6 ds:bg-ui-grey-200 ds:rounded-lg ds:md:w-[30%] flex flex-col justify-between h-full ${className}`}
    >
      <div className="ds:md:pb-10 ds:pb-5">
        <ColorPill
          colorPillText={colorPillText}
          backgroundColor={backgroundColor}
          size={colorPillSize}
        />
      </div>
      {iconUrl && (
        <img src={iconUrl} className="ds:max-w-24 ds:max-h-24 ds:mb-6" />
      )}
      <div className="ds:flex ds:flex-col ds:gap-2.5 flex-grow">
        <h2 className="ds:text-md ds:font-bold">{subtitleText}</h2>
        <p className="ds:md:text-md ds:text-[16px] ds:font-normal ds:text-ui-grey-500">
          {subHeading}
        </p>
      </div>
    </div>
  );
};
