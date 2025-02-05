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
  footerDisclaimerText: string;
}

export const Primary: Story = {
  render: (props: FooterProps) => <Footer {...props} />,
  name: "Footer",
  args: {
    titleText: "Fast, fair, feel-good broadband",
    trustScore: 3.5,
    footerDisclaimerText:
      "© 2021 Cuckoo Internet Ltd is a company registered in England and Wales (No 11926742). Our registered address is 68 Hanbury Street, Spitalfields, London E1 5JL. Our VAT number is 341752118. Cuckoo Internet Ltd is regulated by Ofcom.",
    footerSections: [
      {
        header: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Careers", href: "careers.cuckoo.co/" },
          {
            label: "Cuckoo Compass",
            href: "https://www.cuckoo.co/partner-with-us",
          },
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
