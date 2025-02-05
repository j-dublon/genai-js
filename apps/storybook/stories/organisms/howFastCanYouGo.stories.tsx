import type { Meta, StoryObj } from "@storybook/react";
import { HowFastCanYouGo } from "@react-component-library/ui";

const meta: Meta<typeof HowFastCanYouGo> = {
  component: HowFastCanYouGo
};

export default meta;

type Story = StoryObj<typeof HowFastCanYouGo>;

export const Primary: Story = {
  render: () => <HowFastCanYouGo />,
  name: "How Fast Can You Go",
  args: {}
};
