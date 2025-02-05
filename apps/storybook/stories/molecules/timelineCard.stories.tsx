import type { Meta, StoryObj } from "@storybook/react";
import { TimelineCard } from "@react-component-library/ui";

const meta: Meta<typeof TimelineCard> = {
  component: TimelineCard,
  argTypes: {
    backgroundColor: {
      control: { type: "radio" },
      options: [
        "bg-core-black",
        "bg-ui-grey-200",
        "bg-core-yellow",
        "bg-core-white",
        "bg-core-pink",
      ],
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
    backgroundColor: "bg-core-pink",
    subtitleText: "We'll contact your old broadband provider",
    contextText: "Letting them know you're switching to Cuckoo",
  },
};
