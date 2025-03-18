import { TextWithTickList } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TextWithTickList> = {
  component: TextWithTickList,
};

export default meta;

type Story = StoryObj<typeof TextWithTickList>;

export const Primary: Story = {
  render: (props) => (
    <div className="flex flex-col gap-4 w-[300px]">
      <TextWithTickList {...props} />,
    </div>
  ),
  name: "Text With Tick",
  args: {
    textItems: [
      {
        textInput: "This is an example bit of text with an offer",
        broadbandOffer: true,
      },
      {
        textInput: "This is an example bit of text without",
        backgroundColor: "yellow",
      },
      { textInput: "This is more text", backgroundColor: "blue" },
      { textInput: "And even more!", backgroundColor: "pink" },
    ],
  },
};
