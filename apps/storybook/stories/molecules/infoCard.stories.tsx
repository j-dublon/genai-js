import { BACKGROUND_COLORS, InfoCard } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InfoCard> = {
  component: InfoCard,
  argTypes: {
    colorPillBackgroundColor: {
      options: BACKGROUND_COLORS,
      control: { type: "select" },
    },
    infoCardBackgroundColor: {
      options: BACKGROUND_COLORS,
      control: { type: "select" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof InfoCard>;

export const Primary: Story = {
  render: (props) => <InfoCard {...props} />,
  name: "Info card",
  args: {
    titleText: "A proper fancy router",
    colorPillText: "worth £249.99*",
    colorPillBackgroundColor: "yellow",
    infoCardBackgroundColor: "grey",
    subHeading: "Free eero Pro 6E router",
    additionalText:
      "TrueMesh technology, built-in security, and signal and coverage literally everywhere in your home? Yep, we’d say that’s very fancy indeed. ",
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
        alt: "Picture of an eero router on a background called whoosh",
      },
    },
  },
};
