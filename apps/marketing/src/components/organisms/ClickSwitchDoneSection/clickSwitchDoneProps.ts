interface TimelineCardProps {
  colorPillText: string;
  backgroundColor: BackgroundColors;
  subtitleText: string;
  subHeading: string;
  className?: string;
}

type BackgroundColors = "yellow" | "pink" | "grey" | "orange" | "blue" | "red";

export const timelineCardProps: TimelineCardProps[] = [
  {
    colorPillText: "Today",
    backgroundColor: "pink",
    subtitleText: "We contact your current provider",
    subHeading: "Letting them know you're switching to Cuckoo",
    className: "md:text-[26px] text-[14px]",
  },
  {
    colorPillText: "Day 10",
    backgroundColor: "pink",
    subtitleText: "They'll confirm you're leaving",
    subHeading: "And send you any final bills",
    className: "md:text-[26px] text-[14px]",
  },
  {
    colorPillText: "Day 14",
    backgroundColor: "pink",
    subtitleText: "We get you connected",
    subHeading: "If you need an engineer, they'll pop by and get you set up",
    className: "md:text-[26px] text-[14px]",
  },
];
