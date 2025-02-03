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

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <TimelineCard {...props} />,
  name: "Timeline card",
  args: {
    colourPillText: "Now",
    backgroundColor: "bg-core-pink",
    subtitleText: "We'll contact your old broadband provider",
    lighterText: "Letting them know you're switching to Cuckoo",
  },
};
