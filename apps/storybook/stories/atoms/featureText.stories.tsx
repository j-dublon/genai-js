import type { Meta, StoryObj } from "@storybook/react";
import { FeatureText } from "@react-component-library/ui";

const meta: Meta<typeof FeatureText> = {
  component: FeatureText,
  argTypes: {
    backgroundColor: {
      options: [
        "currentColor",
        "transparent",
        "core-yellow",
        "core-blue",
        "secondary-blue",
        "core-pink",
        "core-black",
        "core-white",
        "ui-grey-200",
        "ui-grey-500",
        "outline-ui-grey-300",
        "link-ui",
      ],
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
    image: { control: "object" },
  },
};

export default meta;

type Story = StoryObj<typeof FeatureText>;

export const Primary: Story = {
  render: (props) => (
    <div className="w-[600px] h-[300px]">
      <FeatureText {...props} />{" "}
    </div>
  ),
  name: "Scaled Text",

  args: {
    topText: "Whooooo",
    bottomText: "oooosh",
    backgroundColor: "secondary-blue",
    textScale: 1.8,
    textGap: 12,
    image: {
      url: "../../assets/images/broadband-genie.svg",
      alt: "its an image",
    },
  },
};
