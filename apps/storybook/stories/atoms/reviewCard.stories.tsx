import { ReviewCard } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ReviewCard> = {
  title: "atoms/reviewCard",
  component: ReviewCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "grey",
      values: [
        {
          name: "grey",
          value: "rgb(243, 244, 246)",
        },
      ],
    },
    docs: {
      description: {
        component:
          "ReviewCard displays customer testimonials and reviews with a title, star rating, review text, and author name.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      description: "The main title/heading of the review",
      control: "text",
    },
    starRating: {
      description: "Rating out of 5 stars",
      control: { type: "range", min: 1, max: 5, step: 0.5 },
    },
    reviewText: {
      description: "The main review content",
      control: "text",
    },
    author: {
      description: "Name of the review author",
      control: "text",
    },
    id: {
      description: "Trustpilot review ID",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReviewCard>;

export const Primary: Story = {
  render: (props) => (
    <div className="">
      <ReviewCard {...props} />
    </div>
  ),
  args: {
    title: "Folks working from home",
    starRating: 5,
    reviewText:
      "I work from home so having good WiFi was really important to me.",
    author: "John Smith",
    id: "123",
  },
};

export const LongReview: Story = {
  render: (props) => (
    <div className="">
      <ReviewCard {...props} />
    </div>
  ),
  args: {
    title: "Life-changing product",
    starRating: 4.5,
    reviewText:
      "I've been using this product for over 6 months now and I can't imagine going back. The customer service team has been incredibly helpful whenever I've had questions. The interface is intuitive and the performance is consistently great. Would highly recommend to anyone looking for a reliable solution.",
    author: "Sarah Johnson",
    id: "123",
  },
};

export const ShortTitle: Story = {
  render: (props) => (
    <div className="">
      <ReviewCard {...props} />
    </div>
  ),
  args: {
    title: "Amazing!",
    starRating: 5,
    reviewText:
      "Quick delivery, great product quality, and excellent customer support. Everything worked perfectly right out of the box.",
    author: "Mike Wilson",
    id: "123",
  },
};

export const LowerRating: Story = {
  render: (props) => (
    <div className="">
      <ReviewCard {...props} />
    </div>
  ),
  args: {
    title: "Good but room for improvement",
    starRating: 3.5,
    reviewText:
      "The product works as advertised, but the setup process could be more streamlined. Once configured, it performs well.",
    author: "Emily Davis",
    id: "123",
  },
};

export const MinimalContent: Story = {
  render: (props) => (
    <div className="">
      <ReviewCard {...props} />
    </div>
  ),
  args: {
    title: "Quick Review",
    starRating: 4,
    reviewText: "Does the job well.",
    author: "P. Thompson",
    id: "123",
  },
};
