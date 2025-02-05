import type { Meta, StoryObj } from "@storybook/react";
import { InputBoxButton } from "@react-component-library/ui";

const meta: Meta<typeof InputBoxButton> = {
  component: InputBoxButton,
};

export default meta;

type Story = StoryObj<typeof InputBoxButton>;

export const Primary: Story = {
  render: (props) => <InputBoxButton {...props} />,
  name: "Input Box Button",
  args: {
    inputBoxButtonText: "",
  },
};
