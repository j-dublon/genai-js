import { Heading } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Heading> = {
  component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const Primary: Story = {
  render: (props) => <Heading {...props} />,
  name: "Heading",
  args: {
    headingText: "This is an example bit of text",
  },
};
