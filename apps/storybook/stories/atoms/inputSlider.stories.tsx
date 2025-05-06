import { InputSlider } from "@react-component-library/ui/server";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof InputSlider> = {
  title: "Atoms/inputSlider",
  component: InputSlider,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number" },
    min: { control: "number" },
    max: { control: "number" },
    showValue: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof InputSlider>;

const InputSliderWithState = (
  props: React.ComponentProps<typeof InputSlider>,
) => {
  const [value, setValue] = useState(props.value);

  return (
    <InputSlider
      {...props}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        props.onChange?.(newValue);
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <InputSliderWithState key={args.value} {...args} />,
  args: {
    value: 0,
    min: 0,
    max: 100,
    label: "Interactive Slider",
  },
};
