import { SectionHeading } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SectionHeading> = {
  component: SectionHeading,
};

export default meta;

type Story = StoryObj<typeof SectionHeading>;

export const Primary: Story = {
  render: (props) => <SectionHeading {...props} />,
  name: "SectionHeading",
  args: {
    headingText: "This is an example bit of text",
  },
};
