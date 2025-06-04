import { BACKGROUND_COLORS, DropdownPill } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof DropdownPill> = {
  title: "atoms/dropdownPill",
  component: DropdownPill,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A dropdown component that displays as a pill with a chevron icon. When clicked, it shows a list of options to select from.",
      },
    },
  },
  argTypes: {
    isOpen: {
      description: "Controls whether the dropdown is open or closed",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    setIsOpen: {
      description: "Function to control the open state of the dropdown",
      control: false,
    },
    value: {
      description: "The currently selected value",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    setValue: {
      description: "Function to update the selected value",
      control: false,
    },
    options: {
      description: "Array of options to display in the dropdown",
      control: "object",
      table: {
        type: { summary: "string[]" },
      },
    },
    backgroundColor: {
      description: "Background color of the dropdown",
      control: "select",
      options: BACKGROUND_COLORS,
      table: {
        type: { summary: "BackgroundColors" },
        defaultValue: { summary: "white" },
      },
    },
    ariaLabel: {
      description: "Custom aria label for accessibility",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      description: "Additional CSS classes to apply",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    whiteText: {
      description: "Whether to use white text color",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    noPadding: {
      description: "Whether to remove padding from the dropdown",
      control: { type: "boolean" },
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DropdownPill>;

const DropdownPillWithState = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(props.value || "Select an option");

  return (
    <DropdownPill
      {...props}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      value={value}
      setValue={setValue}
    />
  );
};

export const Default: Story = {
  args: {
    options: ["Option 1", "Option 2", "Option 3"],
    value: "Select an option",
  },
  render: (args) => <DropdownPillWithState {...args} />,
};

export const WithWhiteText: Story = {
  args: {
    ...Default.args,
    whiteText: true,
    backgroundColor: "black",
  },
  render: (args) => <DropdownPillWithState {...args} />,
};
