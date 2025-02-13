import { MobileAppWithPhone } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof MobileAppWithPhone> = {
  component: MobileAppWithPhone,
};

export default meta;

type Story = StoryObj<typeof MobileAppWithPhone>;

export const Primary: Story = {
  render: (props) => <MobileAppWithPhone {...props} />,
  name: "Mobile app with phone",
  args: {
    headingText: "It’s all in hand with the app",
    textItems: [
      {
        itemText: "Manage your order and installation",
      },
      {
        itemText: "Manage your account and view your bills",
      },
      {
        itemText: "Manage your package",
      },
      {
        itemText: "Add mesh devices to blanket your home",
      },
    ],
  },
};
