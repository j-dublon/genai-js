import { Slider } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Slider> = {
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

const ExampleSlide = ({
  title,
  content,
  name,
}: {
  title: string;
  content: string;
  name: string;
}) => {
  const images = [
    "broadband-genie.svg",
    "compare-the-market.svg",
    "go-compare.svg",
    "money-supermarket.svg",
    "which.svg",
  ];
  return (
    <div className="bg-gray-200 rounded-3xl flex flex-col h-[300px] p-6 mr-4">
      <div className="w-30">
        <h2 className="text-xl font-bold">{title}</h2>
        <img
          src={`../../assets/images/${images[Math.floor(Math.random() * images.length)]}`}
          alt="Rating"
          className="mt-3"
        />
        <p className="mt-5 text-gray-600">{content}</p>
        <strong className="mt-auto">{name}</strong>
      </div>
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
  args: { draggable: true },
  argTypes: {
    draggable: {
      control: { type: "boolean" },
    },
  },
  render: (props) => (
    <div className="w-200">
      <Slider {...props}>{slides}</Slider>
    </div>
  ),
  name: "Slider",
};
