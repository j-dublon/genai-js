import { SimpleNavBar } from "@react-component-library/ui";
import { action } from "@storybook/addon-actions";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SimpleNavBar> = {
  component: SimpleNavBar,
  parameters: {
    docs: {
      description: {
        component:
          "A simple navigation bar component that displays a logo, info text, and additional info text.",
      },
    },
  },
  argTypes: {
    logo: {
      description: "The logo element to display in the navigation bar",
      control: "object",
      table: {
        type: { summary: "JSX.Element" },
      },
    },
    infoText: {
      control: "text",
      description: "Text to display in the info button",
      table: {
        type: { summary: "string" },
      },
    },
    additionalInfoText: {
      control: "text",
      description:
        "Additional text to display (visible on medium screens and up)",
      table: {
        type: { summary: "string" },
      },
    },
    onInfoClick: {
      description: "Function to call when the info button is clicked",
      table: {
        type: { summary: "() => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SimpleNavBar>;

const MockLogo = () => (
  <img
    alt="Cuckoo"
    width={130}
    height={50}
    src="/assets/images/cuckoo.svg"
    className="min-w-[130px] min-h-[50px]"
  />
);

export const Primary: Story = {
  args: {
    logo: <MockLogo />,
    infoText: "All our plans use full fibre.",
    additionalInfoText:
      "In fact, it's the UK's most reliable broadband technology.",
    onInfoClick: action("Info button clicked"),
  },
};
