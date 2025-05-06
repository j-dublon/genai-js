import { Radio } from "@react-component-library/ui/server";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof Radio> = {
  title: "Atoms/radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    name: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="ds:flex ds:flex-col ds:gap-4">
        <div className="ds:flex ds:flex-col ds:gap-3">
          <Radio
            label="Yes"
            value="yes"
            name="yes-no-group"
            checked={selected === "yes"}
            onChange={() => setSelected("yes")}
          />
          <Radio
            label="No"
            value="no"
            name="yes-no-group"
            checked={selected === "no"}
            onChange={() => setSelected("no")}
          />
        </div>
      </div>
    );
  },
};
