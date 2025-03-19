import { TimelineCardList } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TimelineCardList> = {
  component: TimelineCardList,
};

export default meta;

type Story = StoryObj<typeof TimelineCardList>;

export const Primary: Story = {
  render: (props) => (
    <div className="flex md:flex-row flex-col gap-1">
      <TimelineCardList {...props} />
    </div>
  ),
  name: "Timeline card list",
  args: {
    timelineCardProps: [
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
        subHeading:
          "If you need an engineer, they'll pop by and get you set up",
      },
    ],
  },
};
