import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "@react-component-library/ui";

const meta: Meta<typeof ProductCard> = {
  component: ProductCard,
  argTypes: {
    accentColour: {
      control: { type: "radio" },
      options: ["blue", "yellow", "pink"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => (
    <ProductCard
      className={
        "relative flex-initial transition-all duration-[350ms] md:group-hover:outline-core-black basis-[clamp(21rem,29vw,24rem)]"
      }
      header="C-900"
      accentColour={props.accentColour}
      dataVideoIndex={1}
      active={true}
    ></ProductCard>
  ),
  name: "Product Card",
  args: {
    accentColour: "yellow",
  },
};
