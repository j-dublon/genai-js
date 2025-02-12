import type { Meta, StoryObj } from "@storybook/react";
import { Guides } from "@react-component-library/ui";

const meta: Meta<typeof Guides> = {
  component: Guides,
};

export default meta;

type Story = StoryObj<typeof Guides>;

export const Primary: Story = {
  render: (props) => <Guides {...props} />,
  name: "Guides",

  argTypes: {
    guides: {
      description: "Array of guide cards to display in the slider",
      control: "object",
      table: {
        type: {
          summary: "GuideCardProps[]",
          detail: `Array of objects containing:
            - title: string
            - image: { src: string, alt: string, width: number, height: number }
            - tags: Array<{ text: string, backgroundColor: string }>
            - onClick?: () => void`,
        },
        defaultValue: {
          summary: "[]",
        },
      },
    },
  },

  args: {
    guides: [
      {
        title: "Cuckoo partners with  the UK’s biggest energy company",
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
      {
        title:
          "What’s the difference between the internet, broadband and Wi-Fi?",
        image: {
          src: "../../assets/images/guide-2.svg",
          alt: "guide 2 image",
          width: 471,
          height: 280,
        },
        tags: [
          { text: "Guide", backgroundColor: "blue" },
          { text: "Broadband", backgroundColor: "red" },
        ],
      },
      {
        title: "Hitting peak performance: Why full fibre is so reliable ",
        image: {
          src: "../../assets/images/guide-1.svg",
          alt: "guide 3 image",
          width: 471,
          height: 280,
        },
        tags: [
          { text: "Guide", backgroundColor: "blue" },
          { text: "Broadband", backgroundColor: "red" },
        ],
      },
      {
        title: "Gadget addict? Full fibre’s for you",
        image: {
          src: "../../assets/images/guide-2.svg",
          alt: "guide 4 image",
          width: 471,
          height: 280,
        },
        tags: [
          { text: "Guide", backgroundColor: "blue" },
          { text: "Broadband", backgroundColor: "red" },
        ],
      },
    ],
  },
};
