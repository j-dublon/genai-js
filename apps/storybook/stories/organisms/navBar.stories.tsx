import { NavBar } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof NavBar> = {
  component: NavBar,
};

export default meta;

type Story = StoryObj<typeof NavBar>;

export const Primary: Story = {
  render: () => (
    <NavBar
      logo={
        <img
          alt="Cuckoo"
          width="130"
          height="50"
          src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5e3e9035c429e50001a0589f/0x0.png"
        />
      }
      links={[
        {
          name: "Broadband",
          dropdownLinks: [
            { name: "Our broadband", href: "/broadband" },
            { name: "Switching", href: "/switching" },
          ],
        },
        {
          name: "About",
          dropdownLinks: [
            { name: "About Cuckoo", href: "/about" },
            { name: "Blog", href: "/blog" },
          ],
        },
        {
          name: "Support",
          dropdownLinks: [
            {
              name: "Careers",
              href: "https://careers.cuckoo.co/",
              external: true,
            },
            {
              name: "Support",
              href: "https://help.cuckoo.co/en/",
              external: true,
            },
          ],
        },
        {
          name: "Log in",
          dropdownLinks: [
            { name: "Guides", href: "/guide" },
            { name: "Log in", href: "/account/login" },
          ],
        },
      ]}
      signupText="Sign up"
    />
  ),
  name: "NavBar",
  args: {},
};
