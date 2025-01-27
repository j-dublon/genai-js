import type { Meta, StoryObj } from "@storybook/react";
import { ScaledText } from "@react-component-library/ui";

const meta: Meta<typeof ScaledText> = {
  component: ScaledText,
};

export default meta;

type Story = StoryObj<typeof ScaledText>;

export const Primary: Story = {
  render: (props) => <ScaledText {...props} />,
  name: "Company Logo",
  args: {
    topText: "Whoooooooo",
    bottomText: "oooooooosh",
  },
};
