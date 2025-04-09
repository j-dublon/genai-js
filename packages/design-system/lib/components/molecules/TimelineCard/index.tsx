import { ColorPill } from "@components/atoms/ColorPill";
import { BackgroundColors } from "@lib/types";

export interface TimelineCardProps {
  colorPillText: string;
  backgroundColor: BackgroundColors;
  subtitleText: string;
  subHeading: string;
}

export const TimelineCard = ({
  colorPillText,
  backgroundColor,
  subtitleText,
  subHeading,
}: TimelineCardProps) => {
  return (
    <div className="ds:p-4 ds:pb-8 ds:md:p-6 ds:bg-core-grey-200 ds:rounded-lg ds:md:w-[30%]">
      <div className="ds:md:pb-10 ds:pb-5">
        <ColorPill
          colorPillText={colorPillText}
          backgroundColor={backgroundColor}
          size="medium"
        />
      </div>
      <div className="ds:flex ds:flex-col ds:gap-2.5">
        <h2 className="ds:text-md ds:font-bold">{subtitleText}</h2>
        <p className="ds:md:text-md ds:text-[16px] ds:font-normal ds:text-ui-grey-500">
          {subHeading}
        </p>
      </div>
    </div>
  );
};
