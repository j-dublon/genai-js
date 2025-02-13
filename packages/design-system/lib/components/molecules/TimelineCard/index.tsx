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
    <div className="p-5 bg-ui-grey-200 rounded-lg md:w-[30%]">
      <div className="pb-7">
        <ColorPill
          colorPillText={colorPillText}
          backgroundColor={backgroundColor}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p className="text-xl font-bold">{subtitleText}</p>
        <p className="text-xl">{subHeading}</p>
      </div>
    </div>
  );
};
