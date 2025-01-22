import type { Meta, StoryObj } from "@storybook/react";
import { CompanyLogo } from "@react-component-library/ui";

const meta: Meta<typeof CompanyLogo> = {
  component: CompanyLogo,
};

export default meta;

type Story = StoryObj<typeof CompanyLogo>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <CompanyLogo {...props} />,
  name: "Company Logo",
  args: {
    altText: "Cuckoo",
    width: "100",
    height: "100",
    imgSrc:
      "https://s3-eu-west-1.amazonaws.com/tpd/logos/5e3e9035c429e50001a0589f/0x0.png",
  },
};
