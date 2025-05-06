import { Checkbox } from "@react-component-library/ui/server";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof Checkbox> = {
  title: "Atoms/checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const CheckboxWithState = (props: React.ComponentProps<typeof Checkbox>) => {
  const [isChecked, setIsChecked] = useState(props.checked || false);

  return (
    <Checkbox
      {...props}
      checked={isChecked}
      onChange={(checked) => {
        setIsChecked(checked);
        props.onChange?.(checked);
      }}
    />
  );
};

export const Interactive: Story = {
  render: (args) => <CheckboxWithState {...args} />,
  args: {
    label: "Click me to toggle",
    value: "interactive-checkbox",
  },
};
