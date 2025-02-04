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
    trustPilotLogo: {
      control: "object",
      defaultValue: {
        altText: "Trustpilot Logo",
        imgSrc: "../../assets/images/trustpilot-logo.svg,",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TrustpilotHorizontal>;

interface TrustPilotLogo {
  altText: string;
  imgSrc: string;
}

interface TrustpilotHorizontalProps {
  trustScore: number;
  numberOfReviews: number;
  width: number;
  height: number;
  maxWidth?: number;
  maxHeight?: number;
  trustPilotLogo: TrustPilotLogo;
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
    trustPilotLogo: {
      altText: "Trustpilot Logo",
      imgSrc: "../../assets/images/trustpilot-logo.svg",
    },
  },
};
