import type { Meta, StoryObj } from "@storybook/react";
import { Guides } from "@react-component-library/ui";

import { getRandomGuideImage } from "../helpers";

const meta: Meta<typeof Guides> = {
  component: Guides,
};

export default meta;

type Story = StoryObj<typeof Guides>;

export const Primary: Story = {
  render: (props) => <Guides {...props} />,
  name: "Guides",
  args: {
    guides: [
      {
        image: {
          alt: "image",
          url: getRandomGuideImage(),
        },

        tags: [{ text: "xyz", backgroundColor: "bg-core-yellow" }],
        title: "Cool guide bro",
      },
      {
        image: {
          alt: "image",
          url: getRandomGuideImage(),
        },
        tags: [{ text: "xyz", backgroundColor: "bg-core-yellow" }],
        title: "Not so cool",
      },
    ],
  },
};
