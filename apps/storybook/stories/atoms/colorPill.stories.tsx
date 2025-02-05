import type { Meta, StoryObj } from "@storybook/react";
import { ColorPill } from "@react-component-library/ui";

const meta: Meta<typeof ColorPill> = {
  component: ColorPill,
  argTypes: {
    backgroundColor: {
      control: { type: "radio" },
      options: [
        "bg-core-black",
        "bg-ui-grey-200",
        "bg-core-yellow",
        "bg-core-white",
        "bg-core-pink"
      ]
    }
  }
};

export default meta;

type Story = StoryObj<typeof ColorPill>;

export const Primary: Story = {
  render: (props) => <ColorPill {...props} />,
  name: "Color Pill",
  args: {
    colorPillText: "Test",
    backgroundColor: "bg-core-pink"
  }
};
