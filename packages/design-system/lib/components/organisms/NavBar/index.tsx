import { HamburgerButton } from "@components/atoms/HamburgerButton";
import { ChevronVerticalAnimated } from "@components/molecules/ChevronVerticalAnimated";
import Link from "next/link";
import {
  Dispatch,
  JSX,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";

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

export const SignupButton = ({ text }: { text: string }) => (
  <Link href="/join/find-your-address">
    <button
      className="inline-flex items-center justify-center text-core-white bg-core-black px-4 py-2 text-sm font-bold rounded-[12px] cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-105"
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
  const [openDropdownMobile, setOpenDropdownMobile] = useState<string | null>(
    null,
  );
  const mobileNavRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header
        className="w-full top-0 z-50 transition-all duration-300 bg-core-white"
        role="banner"
      >
        {!toggled && (
          <CTA>
            <p className="text-xs leading-[160%] text-core-black">
              <span className="font-semibold">Click. Switch. Done.</span> We'll
              handle the whole broadband move for you
              <Link
                href="/switching"
                className="text-core-purple font-normal rounded ml-1"
              >
                in just one click.
              </Link>
            </p>
          </CTA>
        )}

        <nav
          ref={drawerRef}
          aria-label="Main navigation"
          className={`flex justify-between items-center h-[80px] py-[15px] px-[24px] w-full relative z-50
            ${
              toggled
                ? "bg-core-white"
                : "bg-core-yellow border-b border-core-black/10"
            }
          `}
        >
          {logo && (
            <Link href="/" passHref>
              <div className="cursor-pointer">{logo}</div>
            </Link>
          )}
          <div
            className={`hidden tablet:flex items-center justify-end gap-4 ${
              toggled ? "bg-core-white" : "bg-core-yellow"
            }`}
          >
            <div className="flex justify-end items-center">
              {links
                .filter(({ name }) => name !== "Sign up")
                .map(({ name, href, dropdownLinks }) =>
                  dropdownLinks ? (
                    <DropdownMenu
                      key={name}
                      name={name}
                      dropdownLinks={dropdownLinks}
                      openDropdown={toggled ? null : openDropdown}
                      setOpenDropdown={setOpenDropdown}
                      useDropdown={useDropdown}
                    />
                  ) : (
                    <Link key={name} href={href ?? "#"}>
                      <span className="py-2 px-4 rounded-md text-sm font-semibold leading-[26px] text-black transition-colors duration-200 hover:text-gray-600 cursor-pointer">
                        {name}
                      </span>
                    </Link>
                  ),
                )}
            </div>
            <SignupButton text={signupText} />
          </div>

          <div className="flex items-center gap-4 tablet:hidden">
            <SignupButton text={signupText} />
            <HamburgerButton
              className="tablet:hidden"
              active={toggled}
              setActive={setToggled}
              aria-expanded={toggled}
            />
          </div>
        </nav>
      </header>

      {/* This is the mobile navbar section */}
      {toggled && (
        <aside
          ref={mobileNavRef}
          aria-label="Mobile navigation menu"
          className="fixed top-[80px] left-0 right-0 bottom-0 z-40 flex flex-col bg-core-white h-[calc(100vh-80px)] overflow-y-auto"
        >
          <div className="flex flex-col flex-grow p-4 space-y-0 bg-core-white">
            {links.map((link, index) => {
              const isLast = index === links.length - 1;
              const containerClass = isLast
                ? "border-b border-b-outline-ui-grey-300"
                : "";

              return (
                <div key={link.name} className={containerClass}>
                  {link.dropdownLinks ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOpenDropdownMobile((prev) =>
                            prev === link.name ? null : link.name,
                          );
                        }}
                        className={`tablet:hidden hover:underline flex items-center py-4 justify-between min-h-[3.5rem] w-full text-[26px] font-bold border-t border-t-outline-ui-grey-300 cursor-pointer transition-colors duration-200 group ${
                          openDropdownMobile === link.name
                            ? "underline"
                            : "text-core-black"
                        }`}
                        aria-expanded={openDropdownMobile === link.name}
                        aria-controls={`dropdown-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <span>{link.name}</span>

                        <ChevronVerticalAnimated
                          isOpen={openDropdownMobile === link.name}
                          onClick={(e) => {
                            if (e) {
                              e.preventDefault();
                              e.stopPropagation();
                            }
                            setOpenDropdownMobile((prev) =>
                              prev === link.name ? null : link.name,
                            );
                          }}
                          ariaLabel={`Toggle ${link.name} dropdown`}
                          ariaControls={`dropdown-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                        />
                      </button>

                      {openDropdownMobile === link.name && (
                        <div
                          id={`dropdown-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                          className="space-y-2 mb-4 tablet:hidden"
                        >
                          {link.dropdownLinks.map((subLink) => (
                            <Link key={subLink.name} href={subLink.href ?? "#"}>
                              <span className="block text-[20px] font-bold text-core-black cursor-pointer hover:underline py-2 px-0">
                                {subLink.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={link.href ?? "#"} passHref className="block">
                      <span className="flex items-center hover:underline justify-between min-h-[3.5rem] py-4 w-full text-[26px] font-bold text-core-black bg-core-white border-t border-t-outline-ui-grey-300 cursor-pointer">
                        {link.name}
                      </span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </aside>
      )}
    </>
  );
};
