import type { Meta, StoryObj } from "@storybook/react";
import { CardSection } from "@react-component-library/ui";

const meta: Meta<typeof CardSection> = {
  component: CardSection,
};

export default meta;

type Story = StoryObj<typeof CardSection>;

export const Primary: Story = {
  render: (props) => <CardSection {...props} />,
  name: "Card Section",
  args: {
    infoCardContent: [
      {
        titleText: "Full fibre speeds up to 900Mbps",
        colorPillText: "32x faster",
        colorPillBackgroundColor: "yellow",
        infoCardBackgroundColor: "pink",
        subHeading: "than copped-based broadband.",
      },
      {
        titleText: "Full fibre direct to your home",
        colorPillText: "5x more reliable",
        colorPillBackgroundColor: "yellow",
        infoCardBackgroundColor: "orange",
        subHeading: "than copped-based broadband.",
      },
    ],
    detailedCardContent: {
      titleText: "A properly fancy router",
      colorPillText: "worth £249.99*",
      colorPillBackgroundColor: "yellow",
      infoCardBackgroundColor: "grey",
      subHeading: "Free eero Pro 6E",
      additionalText:
        "TrueMesh technology, built-in security, and signal and coverage literally everywhere in your home? Yep, we’d say that’s very fancy indeed.",
      buttonText: "Tell me more",

      featureTextProps: {
        topText: "Whooooo",
        bottomText: "ooooosh",
        backgroundColor: "blue",
        textColor: "white",
        textScale: 3,
        textGap: "medium",
        infoCard: true,

        image: {
          url: "/assets/images/eero.svg",
          alt: "It's an image of an eero router",
        },
      },
    },
  },
};
