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
          width={130}
          height={50}
          src="https://images.prismic.io/cuckoo-egg/a9ba79c9-aa03-46c5-9555-811affbaf7c3_cuckoo_logo_official.png?auto=compress,format&rect=0,0,1000,326&w=368&h=120"
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
          href: "/account/login",
        },
        {
          name: "Sign up",
          href: "/join/find-your-address",
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
