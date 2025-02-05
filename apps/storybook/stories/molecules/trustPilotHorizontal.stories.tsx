import type { Meta, StoryObj } from "@storybook/react";
import { TrustpilotHorizontal } from "@react-component-library/ui";

const meta: Meta<typeof TrustpilotHorizontal> = {
  component: TrustpilotHorizontal,
  argTypes: {
    trustScore: { control: "number" },
    numberOfReviews: { control: "number" },
    width: { control: "number" },
    height: { control: "number" },
    maxWidth: { control: "number" },
    maxHeight: { control: "number" },
    trustPilotAriaLabel: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof TrustpilotHorizontal>;

interface TrustpilotHorizontalProps {
  trustScore: number;
  numberOfReviews: number;
  width: number;
  height: number;
  maxWidth?: number;
  maxHeight?: number;
}

export const Primary: Story = {
  render: (props: TrustpilotHorizontalProps) => (
    <div style={{ width: props.maxWidth, height: props.maxHeight }}>
      <TrustpilotHorizontal {...props} />
    </div>
  ),
  name: "Trustpilot Horizontal",
  args: {
    trustScore: 4.5,
    numberOfReviews: 1234,
    width: 100,
    height: 50,
    maxWidth: 128,
    maxHeight: 72,
    trustPilotAriaLabel: "Trustpilot Logo",
  },
};
