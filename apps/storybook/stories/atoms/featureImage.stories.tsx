import { BACKGROUND_COLORS, FeatureImage } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof FeatureImage> = {
  component: FeatureImage,
  argTypes: {
    backgroundColor: {
      options: BACKGROUND_COLORS,
      control: { type: "select" },
    },
    backgroundImage: {
      control: { type: "object" },
      defaultValue: undefined,
    },
    overlayImage: {
      control: { type: "object" },
      defaultValue: undefined,
    },
    infoCard: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof FeatureImage>;

export const Primary: Story = {
  render: (props) => (
    <div className="md:w-[600px] md:h-[300px]">
      <FeatureImage {...props} />{" "}
    </div>
  ),
  name: "Scaled Image",

  args: {
    backgroundColor: "secondary-blue",
    backgroundImage: {
      url: "../../assets/images/whooosh.svg",
      alt: "its an image",
    },
    overlayImage: {
      url: "../../assets/images/eero.svg",
      alt: "its an image",
    },
  },
};

export const Secondary: Story = {
  render: (props) => (
    <div className="md:w-[600px] md:h-[300px]">
      <FeatureImage {...props} />{" "}
    </div>
  ),
  name: "No overlay image",

  args: {
    backgroundColor: "secondary-blue",
    backgroundImage: {
      url: "../../assets/images/whooosh.svg",
      alt: "whoosh",
    },
  },
};
