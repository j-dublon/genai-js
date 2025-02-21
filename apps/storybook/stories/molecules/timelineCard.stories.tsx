import { BACKGROUND_COLORS, TimelineCard } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TimelineCard> = {
  component: TimelineCard,
  argTypes: {
    backgroundColor: {
      control: { type: "radio" },
      options: BACKGROUND_COLORS,
    },
  },
};

export default meta;

type Story = StoryObj<typeof TimelineCard>;

export const Primary: Story = {
  render: (props) => <TimelineCard {...props} />,
  name: "Timeline card",
  args: {
    colorPillText: "Now",
    backgroundColor: "pink",
    subtitleText: "We'll contact your old broadband provider",
    subHeading: "Letting them know you're switching to Cuckoo",
  },
};
