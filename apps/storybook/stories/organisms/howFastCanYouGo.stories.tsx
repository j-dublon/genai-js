import type { Meta, StoryObj } from "@storybook/react";
import { HowFastCanYouGo } from "@react-component-library/ui";

const meta: Meta<typeof HowFastCanYouGo> = {
  component: HowFastCanYouGo,
};

export default meta;

type Story = StoryObj<typeof HowFastCanYouGo>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  render: () => <HowFastCanYouGo />,
  name: "How Fast Can You Go",
  args: {

  },
};
