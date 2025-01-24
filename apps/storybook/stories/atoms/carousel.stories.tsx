import { Carousel } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Carousel> = {
  component: Carousel,
};

export default meta;

type Story = StoryObj<typeof Carousel>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

const ExampleSlide = ({
  title,
  content,
  name,
}: {
  title: string;
  content: string;
  name: string;
}) => {
  return (
    <div className="bg-gray-100 rounded-3xl flex flex-col h-[300px] p-6 w-[290px] mr-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <img src="/api/placeholder/120/24" alt="Rating" className="mt-3" />
      <p className="mt-5 text-gray-600">{content}</p>
      <strong className="mt-auto">{name}</strong>
    </div>
  );
};

const authors = ["John", "Jane", "Mary", "Bob", "Alice"];
const slides = Array.from({ length: 5 }, (_, i) => (
  <ExampleSlide
    key={i}
    title={`Title ${i + 1}`}
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    name={authors[Math.floor(Math.random() * authors.length)]}
  />
));

export const Primary: Story = {
  render: () => (
    <div>
      <Carousel>{slides}</Carousel>
    </div>
  ),
};
