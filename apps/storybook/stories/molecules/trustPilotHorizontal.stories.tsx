import { TrustpilotHorizontal } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TrustpilotHorizontal> = {
  component: TrustpilotHorizontal,
  argTypes: {
    trustScore: { control: "number" },
    numberOfReviews: { control: "number" },
  },
};

export default meta;

type Story = StoryObj<typeof TrustpilotHorizontal>;

interface TrustpilotHorizontalProps {
  trustScore: number;
  numberOfReviews?: number;
}

export const Primary: Story = {
  render: (props: TrustpilotHorizontalProps) => (
    <div style={{ width: 128, height: 72 }}>
      <TrustpilotHorizontal {...props} />
    </div>
  ),
  name: "Trustpilot Horizontal",
  args: {
    trustScore: 4.5,
    numberOfReviews: 1234,
  },
};
