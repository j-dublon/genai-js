import type { Meta, StoryObj } from "@storybook/react";
import { Guides } from "@react-component-library/ui";
import { getRandomGuide } from "../helpers";

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
        ...getRandomGuide(),
        title: "Cool guide bro",
      },
      {
        ...getRandomGuide(),
        title: "Another one",
      },
    ],
  },
};
