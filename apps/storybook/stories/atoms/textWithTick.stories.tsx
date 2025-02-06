import type { Meta, StoryObj } from "@storybook/react";
import { TextWithTick } from "@react-component-library/ui";

const meta: Meta<typeof TextWithTick> = {
  component: TextWithTick,
};

export default meta;

type Story = StoryObj<typeof TextWithTick>;

export const Primary: Story = {
  render: (props) => <TextWithTick {...props} />,
  name: "Text With Tick",
  args: {
    textInput: "This is an example bit of text",
  },
};
