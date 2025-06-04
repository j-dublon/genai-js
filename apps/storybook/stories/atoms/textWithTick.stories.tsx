import { BACKGROUND_COLORS, TextWithTick } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextWithTick> = {
  component: TextWithTick,
  argTypes: {
    textInput: { control: "text" },
    backgroundColor: {
      options: BACKGROUND_COLORS,
      control: { type: "select" },
    },
    broadbandOffer: { control: "boolean" },
    padding: { control: "select", options: ["none", "default", "large"] },
    iconSize: { control: "number" },
    outline: { control: "boolean" },
    additionalTextInput: { control: "text" },
    additionalTextStyling: { control: "text" },
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
    padding: "none",
  },
};

export const BroadbandOffer: Story = {
  args: {
    textInput: "Special broadband offer",
    broadbandOffer: true,
  },
};

export const Outline: Story = {
  args: {
    textInput: "This is an outlined version",
    outline: true,
  },
};

export const WithAdditionalText: Story = {
  args: {
    textInput: "Main text",
    additionalTextInput: "with additional text",
    additionalTextStyling: "ds:text-ui-error ds:font-semibold",
  },
};
