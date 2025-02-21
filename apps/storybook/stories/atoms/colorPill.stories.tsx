import { BACKGROUND_COLORS } from "@react-component-library/ui";
import { ColorPill } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ColorPill> = {
  component: ColorPill,
  argTypes: {
    backgroundColor: {
      options: BACKGROUND_COLORS,
      control: { type: "select" },
    },
    size: {
      options: ["small", "medium", "large"],
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
    size: "large",
  },
};
