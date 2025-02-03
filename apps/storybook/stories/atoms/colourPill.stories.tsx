import type { Meta, StoryObj } from "@storybook/react";
import { ColourPill } from "@react-component-library/ui";

const meta: Meta<typeof ColourPill> = {
  component: ColourPill,
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

type Story = StoryObj<typeof ColourPill>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <ColourPill {...props} />,
  name: "Colour Pill",
  args: {
    colourPillText: "Test",
    backgroundColor: "bg-core-pink",
  },
};
