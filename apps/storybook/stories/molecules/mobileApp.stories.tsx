import type { Meta, StoryObj } from "@storybook/react";
import { MobileApp } from "@react-component-library/ui";

const meta: Meta<typeof MobileApp> = {
  component: MobileApp
};

export default meta;

type Story = StoryObj<typeof MobileApp>;

export const Primary: Story = {
  render: (props) => <MobileApp {...props} />,
  name: "Mobile app",
  args: {
    headingText: "It’s all in hand with the app",
    textItems: [
      {
        itemText: "Manage your order and installation"
      },
      {
        itemText: "Manage your account and view your bills"
      },
      {
        itemText: "Manage your package"
      },
      {
        itemText: "Add mesh devices to blanket your home"
      }
    ]
  }
};
