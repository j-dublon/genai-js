import { ToggleSwitch } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof ToggleSwitch> = {
  component: ToggleSwitch,
  parameters: {
    docs: {
      description: {
        component:
          "A toggle switch component that allows users to switch between two states.",
      },
    },
  },
  argTypes: {
    isOn: {
      control: "boolean",
      description: "Controls whether the toggle is in the 'on' state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onChange: {
      description: "Callback function called when the toggle state changes",
      table: {
        type: { summary: "(isOn: boolean) => void" },
      },
    },
    leftLabel: {
      control: "text",
      description: "Label for the left side of the toggle",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "Off" },
      },
    },
    rightLabel: {
      control: "text",
      description: "Label for the right side of the toggle",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "On" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleSwitch>;

export const Default: Story = {
  render: (args) => {
    const [isOn, setIsOn] = useState(args.isOn);
    return <ToggleSwitch {...args} isOn={isOn} onChange={setIsOn} />;
  },
  args: {
    isOn: false,
    leftLabel: "Off",
    rightLabel: "On",
  },
};
