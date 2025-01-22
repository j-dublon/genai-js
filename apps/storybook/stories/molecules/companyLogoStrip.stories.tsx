import type { Meta, StoryObj } from "@storybook/react";
import { CompanyLogoStrip } from "@react-component-library/ui";

const meta: Meta<typeof CompanyLogoStrip> = {
  component: CompanyLogoStrip,
  argTypes: {
    backgroundColor: {
      control: { type: "radio" },
      options: [
        "bg-core-black",
        "bg-ui-grey-200",
        "bg-core-yellow",
        "bg-core-white",
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof CompanyLogoStrip>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: (props) => <CompanyLogoStrip {...props} />,
  name: "Company Logo Strip",
  args: {
    logos: [
      {
        altText: "Broadband genie logo",
        width: "100",
        height: "100",
        imgSrc: "/assets/images/broadband-genie.svg",
      },
      {
        altText: "Compare the market logo",
        width: "100",
        height: "100",
        imgSrc: "/assets/images/compare-the-market.svg",
      },
      {
        altText: "Go compare logo",
        width: "100",
        height: "100",
        imgSrc: "/assets/images/go-compare.svg",
      },
      {
        altText: "Money supermarket logo",
        width: "100",
        height: "100",
        imgSrc: "/assets/images/money-supermarket.svg",
      },
      {
        altText: "Which logo",
        width: "100",
        height: "100",
        imgSrc: "/assets/images/which.svg",
      },
    ],
    backgroundColor: "bg-ui-grey-200",
  },
};
