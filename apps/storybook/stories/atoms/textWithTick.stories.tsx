import type { Meta, StoryObj } from "@storybook/react";
import { TextWithTick } from "@react-component-library/ui";

const meta: Meta<typeof TextWithTick> = {
  component: TextWithTick,
};

export default meta;

type Story = StoryObj<typeof TextWithTick>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <TextWithTick {...props} />,
  name: "Text With Tick",
  args: {
    textInput: "This is an example bit of text",
  },
};
