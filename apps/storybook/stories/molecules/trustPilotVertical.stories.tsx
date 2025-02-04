import type { Meta, StoryObj } from "@storybook/react";
import { TrustpilotVertical } from "@react-component-library/ui";

const meta: Meta<typeof TrustpilotVertical> = {
  component: TrustpilotVertical,
  argTypes: {
    trustScore: { control: "number" },
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

type Story = StoryObj<typeof TrustpilotVertical>;

interface TrustPilotLogo {
  altText: string;
  imgSrc: string;
}

interface TrustpilotVerticalProps {
  trustScore: number;
  width: number;
  height: number;
  maxWidth?: number;
  maxHeight?: number;
  trustPilotLogo: TrustPilotLogo;
}

export const Primary: Story = {
  render: (props: TrustpilotVerticalProps) => (
    <div style={{ width: props.maxWidth, height: props.maxHeight }}>
      <TrustpilotVertical {...props} />
    </div>
  ),
  name: "Trustpilot Vertical",
  args: {
    trustScore: 4.5,
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
