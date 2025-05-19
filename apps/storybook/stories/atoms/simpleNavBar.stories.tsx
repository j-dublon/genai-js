import { SimpleNavBar } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof SimpleNavBar> = {
  component: SimpleNavBar,
  parameters: {
    docs: {
      description: {
        component:
          "A simple navigation bar component that displays a logo and children. Logo is optional, and if not provided, the default Cuckoo logo will be used.",
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
    children: <p>Child Item</p>,
  },
};
