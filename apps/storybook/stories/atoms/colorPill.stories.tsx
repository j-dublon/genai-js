import type { Meta, StoryObj } from "@storybook/react";
import { ColorPill } from "@react-component-library/ui";

const meta: Meta<typeof ColorPill> = {
  component: ColorPill,
  argTypes: {
    backgroundColor: {
      options: ["yellow", "pink"],
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ColorPill>;

export const Primary: Story = {
  render: (props) => <ColorPill {...props} />,
  name: "Color Pill",
  args: {
    colorPillText: "Test",
    backgroundColor: "yellow",
  },
};
