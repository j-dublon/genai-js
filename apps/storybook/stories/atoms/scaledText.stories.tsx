import type { Meta, StoryObj } from "@storybook/react";
import { ScaledText } from "@react-component-library/ui";
import { backgroundColors } from "../../values";

const meta: Meta<typeof ScaledText> = {
  component: ScaledText,
  argTypes: {
    backgroundColor: {
      options: backgroundColors,
      control: { type: "select" },
    },
    topText: {
      control: "text",
    },
    bottomText: {
      control: "text",
    },
    textScale: {
      control: "number",
    },
    textGap: {
      options: [1, 2, 4, 6, 8, 12, 14],
      control: { type: "select" },
    },
    imageUrl: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof ScaledText>;

export const Primary: Story = {
  render: (props) => (
    <div className="w-[600px] h-[300px]">
      <ScaledText {...props} />{" "}
    </div>
  ),
  name: "Scaled Text",

  args: {
    topText: "Whooooo",
    bottomText: "oooosh",
    backgroundColor: "secondary-blue",
    textScale: 1.8,
    textGap: 12,
    imageUrl: "../../assets/images/broadband-genie.svg",
  },
};
