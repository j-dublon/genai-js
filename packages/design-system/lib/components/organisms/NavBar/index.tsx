import { HamburgerButton } from "@components/atoms/HamburgerButton";
import Link from "next/link";
import { JSX, useEffect, useRef, useState } from "react";

import { CTA } from "./CTA";
import { DropdownMenu } from "./DropdownMenu";

interface NavBarProps {
  logo?: JSX.Element;
  links: {
    name: string;
    href?: string;
    dropdownLinks?: { name: string; href?: string; external?: boolean }[];
  }[];
  signupText: string;
}

//TODO: This needs be a reusable button with animation used site wide
export const SignupButton = ({ text }: { text: string }) => (
  <Link href="/join/find-your-address" passHref>
    <button
      className="inline-flex items-center justify-center text-core-white bg-core-black px-4 py-2 text-sm font-bold text-white rounded-[12px] cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105"
      aria-label="Sign up button"
    >
      {text}
    </button>
  </Link>
);

export const NavBar = ({ logo, links, signupText }: NavBarProps) => {
  const [toggled, setToggled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setToggled(false);
        setOpenDropdown(null);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setToggled(false);
        setOpenDropdown(null);
      }
    }

    if (toggled || openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [toggled, openDropdown]);

  return (
    <header className="w-full top-0 z-50 transition-all duration-300 bg-white shadow-md">
      <CTA>
        <p className="text-[14px] leading-[160%] text-core-black">
          <span className="font-semibold">Click. Switch. Done.</span> We’ll
          handle the whole broadband move for you
          <Link
            href="/switching"
            className="bg-core-light-purple text-core-purple font-normal rounded ml-1"
          >
            in just one click.
          </Link>
        </p>
      </CTA>

      <div className="flex bg-core-yellow justify-between items-center h-[80px] py-[15px] md:px-[48px] px-[24px] w-full border-b border-core-black/10">
        {logo && <div>{logo}</div>}
        <div className="flex items-center md:gap-4 gap-8">
          <nav className="hidden justify-end items-center tablet:flex">
            {links.map(({ name, href, dropdownLinks }) =>
              dropdownLinks ? (
                <DropdownMenu
                  key={name}
                  name={name}
                  dropdownLinks={dropdownLinks}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                />
              ) : (
                <Link key={name} href={href ?? "#"}>
                  <span className="py-2 px-4 rounded-md text-[16px] font-semibold leading-[26px] text-black transition-colors duration-200 hover:text-gray-600 cursor-pointer">
                    {name}
                  </span>
                </Link>
              ),
            )}
          </nav>

          <SignupButton text={signupText} />
          <HamburgerButton
            className="tablet:hidden"
            active={toggled}
            setActive={setToggled}
            aria-expanded={toggled}
          />
        </div>
      </div>
    </header>
  );
};
