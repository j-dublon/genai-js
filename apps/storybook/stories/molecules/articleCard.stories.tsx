import type { Meta, StoryObj } from "@storybook/react";
import { ArticleCard } from "@react-component-library/ui";

const meta: Meta<typeof ArticleCard> = {
  component: ArticleCard,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof ArticleCard>;

export const Primary: Story = {
  render: () => (
    <ArticleCard
      imageUrl="https://images.prismic.io/cuckoo-egg/353122c1-ecf2-4be9-bc9e-61ad08978207_Upgrading+to+full+fibre.png?auto=compress,format&rect=0,33,2144,1206&w=1100&h=619"
      imageAlt="Article image 1"
      title="First blog post"
      slug="/blog/1"
      primaryTag="Blog"
    />
  ),
  name: "ArticleCard",
  args: {},
};
