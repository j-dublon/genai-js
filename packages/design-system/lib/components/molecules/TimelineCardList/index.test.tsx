import "@testing-library/jest-dom";

import { TimelineCardProps } from "@components/molecules/TimelineCard";
import { render, screen } from "@testing-library/react";

import { TimelineCardList } from ".";

const mockTimelineCardProps: TimelineCardProps[] = [
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

describe("Timeline Card List Component", () => {
  beforeEach(() => {
    render(<TimelineCardList timelineCardProps={mockTimelineCardProps} />);
  });

  it("renders the first timeline card", () => {
    const colorPillWithText = mockTimelineCardProps[0].colorPillText;
    const subtitleText = mockTimelineCardProps[0].subtitleText;
    const subHeading = mockTimelineCardProps[0].subHeading;

    expect(screen.getByText(colorPillWithText)).toBeInTheDocument();
    expect(screen.getByText(colorPillWithText)).toHaveStyle(
      "background-color: bg-core-pink",
    );
    expect(screen.getByText(subtitleText)).toBeInTheDocument();
    expect(screen.getByText(subHeading)).toBeInTheDocument();
  });

  it("renders the second timeline card", () => {
    const colorPillWithText = mockTimelineCardProps[1].colorPillText;
    const subtitleText = mockTimelineCardProps[1].subtitleText;
    const subHeading = mockTimelineCardProps[1].subHeading;

    expect(screen.getByText(colorPillWithText)).toBeInTheDocument();
    expect(screen.getByText(colorPillWithText)).toHaveStyle(
      "background-color: bg-core-pink",
    );
    expect(screen.getByText(subtitleText)).toBeInTheDocument();
    expect(screen.getByText(subHeading)).toBeInTheDocument();
  });

  it("renders the third timeline card", () => {
    const colorPillWithText = mockTimelineCardProps[2].colorPillText;
    const subtitleText = mockTimelineCardProps[2].subtitleText;
    const subHeading = mockTimelineCardProps[2].subHeading;

    expect(screen.getByText(colorPillWithText)).toBeInTheDocument();
    expect(screen.getByText(colorPillWithText)).toHaveStyle(
      "background-color: bg-core-pink",
    );
    expect(screen.getByText(subtitleText)).toBeInTheDocument();
    expect(screen.getByText(subHeading)).toBeInTheDocument();
  });
});
