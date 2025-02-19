import { PostcodeChecker } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PostcodeChecker> = {
  component: PostcodeChecker,
};

export default meta;

type Story = StoryObj<typeof PostcodeChecker>;

export const Primary: Story = {
  render: (props) => <PostcodeChecker {...props} />,
  name: "PostcodeChecker",
  args: {
    titleText: "How fast can you go?",
    placeholderText: "Enter postcode",
    inputBoxButtonText: "Check availability",
  },
};
