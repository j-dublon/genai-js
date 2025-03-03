import { ReviewCardSkeleton } from "@react-component-library/ui/server";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ReviewCardSkeleton> = {
  title: "atoms/reviewCardSkeleton",
  component: ReviewCardSkeleton,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "grey",
      values: [
        {
          name: "grey",
          value: "#F5F5F5",
        },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ReviewCardSkeleton>;

export default meta;

type Story = StoryObj<typeof ReviewCardSkeleton>;

export const Primary: Story = {
  render: () => <ReviewCardSkeleton />,
  name: "ReviewCardSkeleton",
};
