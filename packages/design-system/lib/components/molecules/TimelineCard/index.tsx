import { ColourPill } from "@lib/index";

export interface TimelineCardProps {
  colourPillText: string;
  backgroundColor: string;
  subtitleText: string;
  lighterText: string;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  colourPillText,
  backgroundColor,
  subtitleText,
  lighterText,
}) => {
  return (
    <div className="p-5 bg-ui-grey-200 rounded-lg md:w-[30%]">
      <div className="pb-7">
        <ColourPill
          colourPillText={colourPillText}
          backgroundColor={backgroundColor}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p className="text-xl font-bold">{subtitleText}</p>
        <p className="text-xl">{lighterText}</p>
      </div>
    </div>
  );
};

TimelineCard.displayName = "TimelineCard";
