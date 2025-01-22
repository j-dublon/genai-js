import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "@react-component-library/ui";

const meta: Meta<typeof Footer> = {
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
interface Link {
  label: string;
  href: string;
}

interface FooterSection {
  header: string;
  links: Link[];
}

interface FooterProps {
  titleText: string;
  trustScore: number;
  footerSections: FooterSection[];
}

export const Primary: Story = {
  render: (props: FooterProps) => <Footer {...props} />,
  name: "Footer",
  args: {
    titleText: "Fast, fair, feel good broadband",
    trustScore: 1,
    footerSections: [
      {
        header: "Company",
        links: [
          { label: "About", href: "#" },
          { label: "Careers", href: "#" },
          { label: "Cuckoo Compass", href: "#" },
          { label: "Refer a Friend", href: "#" },
          { label: "The Loyalty Tax", href: "#" },
        ],
      },
      {
        header: "Help & Contact",
        links: [
          { label: "Support", href: "#" },
          { label: "Content Hub", href: "#" },
          { label: "Press", href: "#" },
        ],
      },
      {
        header: "Useful Links",
        links: [
          { label: "Terms & Conditions", href: "#" },
          { label: "Privacy Policy", href: "#" },
          { label: "Cookie Policy", href: "#" },
          { label: "Complaints Code", href: "#" },
          { label: "Call Charges", href: "#" },
          { label: "Prices & Charge List", href: "#" },
        ],
      },
    ],
  },
};
