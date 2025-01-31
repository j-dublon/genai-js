import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "@react-component-library/ui";

const meta: Meta<typeof Heading> = {
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <Heading {...props} />,
  name: "Heading",
  args: {
    headingText: "This is an example bit of text",
  },
};
