import type { Meta, StoryObj } from "@storybook/react";
import { InfoCard } from "@react-component-library/ui";

const meta: Meta<typeof InfoCard> = {
  component: InfoCard,
  argTypes: {
    colorPillBackgroundColor: {
      control: { type: "radio" },
      options: [
        "bg-core-black",
        "bg-ui-grey-200",
        "bg-core-yellow",
        "bg-core-white",
        "bg-core-pink",
      ],
    },
    infoCardBackgroundColor: {
      control: { type: "radio" },
      options: [
        "bg-core-black",
        "bg-ui-grey-200",
        "bg-core-yellow",
        "bg-core-white",
        "bg-core-pink",
      ],
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
    colorPillBackgroundColor: "bg-core-yellow",
    infoCardBackgroundColor: "bg-ui-grey-200",
    contextText: "Free eero Pro 6E router",
    additionalText:
      "TrueMesh technology, built-in security, and signal and coverage literally everywhere in your home? Yep, we’d say that’s very fancy indeed. ",
    buttonText: "Tell me more",
    featureTextProps: {
      "topText": "Whooooo",
      "bottomText": "ooooosh",
      "backgroundColor": "core-blue",
      "textColor": "white",
      "textScale": 3,
      "textGap": 12,
      "infoCard": true,

      "image": {
        "url": "/assets/images/eero.svg",
        "alt": "Picture of an eero router on a background called whoosh"
      }
    },
  },
};
