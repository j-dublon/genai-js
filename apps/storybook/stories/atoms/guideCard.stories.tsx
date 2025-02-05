import type { Meta, StoryObj } from "@storybook/react";
import { GuideCard } from "@react-component-library/ui";
import { getRandomColor, getRandomGuideImage } from "../helpers";

const meta: Meta<typeof GuideCard> = {
  component: GuideCard,
};

export default meta;

type Story = StoryObj<typeof GuideCard>;

export const Primary: Story = {
  render: (props) => <GuideCard {...props} />,
  name: "GuideCard",
  args: {
    title: "A cool guide",
    image: {
      src: getRandomGuideImage(),
      alt: "image",
    },
    tags: [
      { text: "Guide", backgroundColor: getRandomColor() },
      { text: "Article", backgroundColor: getRandomColor() },
      { text: "Broadband", backgroundColor: getRandomColor() },
    ],
  },
};
