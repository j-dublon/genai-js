import { HamburgerButton } from "@components/atoms/HamburgerButton";
import Link from "next/link";
import { Dispatch, JSX, RefObject, SetStateAction } from "react";

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
  toggled: boolean;
  setToggled: Dispatch<SetStateAction<boolean>>;
  openDropdown: string | null;
  setOpenDropdown: Dispatch<SetStateAction<string | null>>;
  drawerRef: RefObject<HTMLDivElement>;
  useDropdown: (
    name: string,
    openDropdown: string | null,
    setOpenDropdown: (name: string | null) => void,
  ) => { isOpen: boolean; dropdownRef: RefObject<HTMLDivElement> };
}

//TODO: This needs to be a reusable button with animation used site-wide
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

export const NavBar = ({
  logo,
  links,
  signupText,
  toggled,
  setToggled,
  openDropdown,
  setOpenDropdown,
  drawerRef,
  useDropdown,
}: NavBarProps) => {
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

      <div
        ref={drawerRef}
        className="flex bg-core-yellow justify-between items-center h-[80px] py-[15px] md:px-[48px] px-[24px] w-full border-b border-core-black/10"
      >
        {logo && (
          <Link href="/" passHref>
            <div className="cursor-pointer">{logo}</div>
          </Link>
        )}
        <div className="flex items-center md:gap-4 gap-8">
          <nav className="hidden tablet:flex justify-end items-center">
            {links.map(({ name, href, dropdownLinks }) =>
              dropdownLinks ? (
                <DropdownMenu
                  key={name}
                  name={name}
                  dropdownLinks={dropdownLinks}
                  openDropdown={openDropdown}
                  setOpenDropdown={setOpenDropdown}
                  useDropdown={useDropdown}
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
