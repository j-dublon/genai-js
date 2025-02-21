import { MobilePhone } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MobilePhone> = {
  component: MobilePhone,
  argTypes: {
    selectedTextIndex: {
      control: { type: "radio" },
      options: [0, 1, 2, 3],
    },
  },
};

export default meta;

type Story = StoryObj<typeof MobilePhone>;

export const Primary: Story = {
  render: (props) => <MobilePhone {...props} />,
  name: "Mobile Phone",
  args: {
    selectedTextIndex: 0,
  },
};
