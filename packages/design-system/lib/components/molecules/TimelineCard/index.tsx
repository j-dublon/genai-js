import { ColorPill } from "@lib/index";

export interface TimelineCardProps {
  colorPillText: string;
  backgroundColor: string;
  subtitleText: string;
  contextText: string;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  colorPillText,
  backgroundColor,
  subtitleText,
  contextText
}) => {
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
        <p className="text-xl">{contextText}</p>
      </div>
    </div>
  );
};

TimelineCard.displayName = "TimelineCard";
