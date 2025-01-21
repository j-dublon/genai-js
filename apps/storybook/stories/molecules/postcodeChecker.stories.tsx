import type { Meta, StoryObj } from "@storybook/react";
import { PostcodeChecker } from "@react-component-library/ui";

const meta: Meta<typeof PostcodeChecker> = {
  component: PostcodeChecker,
};

export default meta;

type Story = StoryObj<typeof PostcodeChecker>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <PostcodeChecker {...props} />,
  name: "PostcodeChecker",
  args: {
    titleText: "How fast can you go?",
    topText: "Check your speed",
    placeholderText: "Enter postcode",
    inputBoxButtonText: "Check availability",
  },
};
