import { NavBar } from "@react-component-library/ui";

import { useDropdown } from "@/hooks/useDropdown";
import { useNavBarHandlers } from "@/hooks/useNavBarHandlers";

export const NavBarWrapper = () => {
  const { toggled, setToggled, openDropdown, setOpenDropdown, drawerRef } =
    useNavBarHandlers();

  return (
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
        {
          name: "Log in",
        },
      ]}
      signupText="Sign up"
      toggled={toggled}
      setToggled={setToggled}
      openDropdown={openDropdown}
      setOpenDropdown={setOpenDropdown}
      drawerRef={drawerRef}
      useDropdown={useDropdown}
    />
  );
};
