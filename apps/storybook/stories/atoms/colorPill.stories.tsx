import { BACKGROUND_COLORS, ColorPill } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ColorPill> = {
  component: ColorPill,
  argTypes: {
    backgroundColor: {
      options: BACKGROUND_COLORS,
      control: { type: "select" },
    },
    size: {
      options: ["extraSmall", "small", "medium", "large"],
      control: { type: "select" },
    },
    whiteText: {
      control: "boolean",
      description: "Whether to use white text instead of black",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the component",
    },
    icon: {
      description: "Optional icon to display next to the text",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "undefined" },
      },
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
