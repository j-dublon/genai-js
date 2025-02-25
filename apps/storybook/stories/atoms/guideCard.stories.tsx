import { BACKGROUND_COLORS, GuideCard } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof GuideCard> = {
  component: GuideCard,
  argTypes: {
    title: {
      description: "The title text of the guide card",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    image: {
      description: "Image properties for the guide card",
      control: "object",
      table: {
        type: {
          summary: "Image",
          detail: `{
            src: string;
            alt: string;
            width: number;
            height: number;
          }`,
        },
      },
    },
    url: {
      description: "URL to link to",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    tags: {
      description: "Array of tags to display on the guide card",
      control: "object",
      table: {
        type: {
          summary: "Tag[]",
          detail: `Array<{
            text: string;
            backgroundColor: ${BACKGROUND_COLORS.join(" | ")};
          }>`,
        },
      },
    },
    onClick: {
      description: "Optional click handler for the guide card",
      action: "clicked",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GuideCard>;

export const Primary: Story = {
  render: (props) => <GuideCard {...props} />,
  name: "GuideCard",
  args: {
    title: "Cuckoo partners with the UK's biggest energy company",
    image: {
      src: "../../assets/images/guide-1.svg",
      alt: "guide 1 image",
      width: 471,
      height: 280,
    },
    tags: [
      { text: "Guide", backgroundColor: "blue" },
      { text: "Broadband", backgroundColor: "red" },
    ],
  },
};
