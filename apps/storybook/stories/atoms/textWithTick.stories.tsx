import { TextWithTick } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextWithTick> = {
  component: TextWithTick,
  argTypes: {
    textInput: { control: "text" },
    backgroundColor: { control: "select" },
    broadbandOffer: { control: "boolean" },
    noPadding: { control: "boolean" },
  },
};

export default meta;

type Story = StoryObj<typeof TextWithTick>;

export const Default: Story = {
  args: {
    textInput: "This is an example with yellow background",
    backgroundColor: "yellow",
  },
};

export const NoPadding: Story = {
  args: {
    textInput: "This is an example with no background color or padding",
    noPadding: true,
  },
};

export const BroadbandOffer: Story = {
  args: {
    textInput: "Special broadband offer",
    broadbandOffer: true,
  },
};
