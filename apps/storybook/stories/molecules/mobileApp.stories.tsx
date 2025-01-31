import type { Meta, StoryObj } from "@storybook/react";
import { MobileApp } from "@react-component-library/ui";

const meta: Meta<typeof MobileApp> = {
  component: MobileApp,
};

export default meta;

type Story = StoryObj<typeof MobileApp>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <MobileApp {...props} />,
  name: "Mobile app",
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
