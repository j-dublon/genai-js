import { BackgroundColors } from "@react-component-library/ui";

interface TimelineCardProps {
  colorPillText: string;
  backgroundColor: BackgroundColors;
  subtitleText: string;
  subHeading: string;
  className?: string;
}

export const timelineCardProps: TimelineCardProps[] = [
  {
    colorPillText: "Today",
    backgroundColor: "pink",
    subtitleText: "We contact your current provider",
    subHeading: "Letting them know you're switching to Cuckoo",
  },
  {
    colorPillText: "Day 10",
    backgroundColor: "pink",
    subtitleText: "They'll confirm you're leaving",
    subHeading: "And send you any final bills",
  },
  {
    colorPillText: "Day 14",
    backgroundColor: "pink",
    subtitleText: "We aim to get you connected",
    subHeading: "If you need an engineer, they'll pop by and get you set up",
  },
];
