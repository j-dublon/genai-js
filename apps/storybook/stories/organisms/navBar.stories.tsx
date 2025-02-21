import { useDropdown } from "@hooks/useDropdown";
import { useNavBarHandlers } from "@hooks/useNavBarHandlers";
import { NavBar } from "@react-component-library/ui";
import type { Meta, StoryObj } from "@storybook/react";

const navBarProps = {
  logo: (
    <img
      alt="Cuckoo"
      width="130"
      height="50"
      src="https://s3-eu-west-1.amazonaws.com/tpd/logos/5e3e9035c429e50001a0589f/0x0.png"
    />
  ),
  links: [
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
        {
          name: "Careers",
          href: "https://careers.cuckoo.co/",
          external: true,
        },
      ],
    },
    {
      name: "Support",
      dropdownLinks: [
        {
          name: "Help center",
          href: "https://help.cuckoo.co/en/",
          external: true,
        },
        { name: "Guides", href: "/guide" },
      ],
    },
    { name: "Log in" },
  ],
  signupText: "Sign up",
};

const NavBarWithHooks = (args: any) => {
  const { toggled, setToggled, openDropdown, setOpenDropdown, drawerRef } =
    useNavBarHandlers();

  return (
    <NavBar
      {...args}
      toggled={toggled}
      setToggled={setToggled}
      openDropdown={openDropdown}
      setOpenDropdown={setOpenDropdown}
      drawerRef={drawerRef}
      useDropdown={useDropdown}
    />
  );
};

const meta = {
  component: NavBarWithHooks,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    logo: {
      control: "boolean",
      description: "Toggle logo visibility",
    },
    signupText: {
      control: "text",
      description: "Text to display on the signup button",
    },
  },
} satisfies Meta<typeof NavBarWithHooks>;

export default meta;
type Story = StoryObj<typeof NavBarWithHooks>;

export const DesktopNavBar: Story = {
  name: "Desktop Navigation",
  args: {
    ...navBarProps,
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop",
    },
    docs: {
      description: {
        story:
          "Desktop version of the navigation bar with full menu visibility",
      },
    },
  },
};

export const MobileNavBar: Story = {
  name: "Mobile Navigation",
  args: {
    ...navBarProps,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
    docs: {
      description: {
        story: "Mobile version of the navigation bar with hamburger menu",
      },
    },
  },
};
