import { BACKGROUND_COLORS, FeatureText } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FeatureText> = {
  component: FeatureText,
  argTypes: {
    backgroundColor: {
      options: BACKGROUND_COLORS,
      control: { type: "select" },
    },
    textColor: {
      options: ["indigo", "black", "white", "grey"],
      control: { type: "select" },
    },
    topText: {
      control: "text",
    },
    bottomText: {
      control: "text",
    },
    textScale: {
      control: { type: "number" },
    },
    textGap: {
      options: ["small", "medium", "large"],
      control: { type: "select" },
    },
    image: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<typeof FeatureText>;

export const Primary: Story = {
  render: (props) => (
    <div className="md:w-[600px] md:h-[300px]">
      <FeatureText {...props} />{" "}
    </div>
  ),
  name: "Scaled Text",

  args: {
    topText: "Whooooo",
    bottomText: "ooooosh",
    backgroundColor: "blue",
    textColor: "white",
    textScale: 1.8,
    textGap: "medium",
    image: {
      url: "../../assets/images/eero.svg",
      alt: "its an image",
    },
  },
};
