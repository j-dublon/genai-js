import { Button } from "@components/atoms/Button";
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
  isContentPage?: boolean;
  showReferFriendCTA?: boolean;
}

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
  isContentPage = false,
  showReferFriendCTA = true,
}: NavBarProps) => {
  const [openDropdownMobile, setOpenDropdownMobile] = useState<string | null>(
    null,
  );
  const mobileNavRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <header
        className="ds:w-full ds:top-0 ds:z-50 ds:transition-all ds:duration-300 ds:bg-core-white"
        role="banner"
      >
        {!toggled && showReferFriendCTA && (
          <CTA>
            <p className="ds:text-xs ds:leading-[160%] ds:text-core-black">
              <Link
                href="/refer-a-friend"
                className="ds:text-ui-link ds:font-medium ds:underline ds:rounded ds:ml-1"
              >
                Refer a friend
              </Link>{" "}
              to Cuckoo and you&apos;ll both get{" "}
              <span className="ds:font-semibold">£50 credit.</span> Woohoo!
            </p>
          </CTA>
        )}

        <nav
          ref={drawerRef}
          aria-label="Main navigation"
          className={`ds:flex ds:justify-between ds:items-center ds:h-20 ds:py-[15px] ds:px-5 ds:md:px-12 ds:w-full ds:relative ds:z-50
            ${
              isContentPage
                ? "ds:bg-core-white" // If it's a content page, always white with no border
                : toggled
                  ? "ds:bg-core-white" // If toggled, white background
                  : "ds:bg-core-yellow ds:border-b ds:border-[#1f1f1f1a]" // Default yellow with border
            }
          `}
        >
          {logo && (
            <Link href="/" passHref>
              <div className="ds:cursor-pointer">{logo}</div>
            </Link>
          )}
          <div
            className={`ds:hidden ds:md:flex ds:items-center ds:justify-end ds:gap-4 ${
              isContentPage
                ? "ds:bg-core-white"
                : toggled
                  ? "ds:bg-core-white"
                  : "ds:bg-core-yellow"
            }`}
          >
            <div className="ds:flex ds:justify-end ds:items-center">
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
                      <span
                        className="ds:py-2 ds:px-4 ds:rounded-md ds:text-sm ds:font-semibold ds:leading-[26px] ds:text-core-black 
                        ds:transition-colors ds:duration-200 ds:hover:text-gray-600 ds:cursor-pointer"
                      >
                        {name}
                      </span>
                    </Link>
                  ),
                )}
            </div>
            <Button variant="solid" size="small" href="/join/find-your-address">
              {signupText}
            </Button>
          </div>

          <div className="ds:flex ds:items-center ds:gap-4 ds:md:hidden">
            <Button variant="solid" size="small" href="/join/find-your-address">
              {signupText}
            </Button>
            <HamburgerButton
              className="ds:md:hidden"
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
          className="ds:fixed ds:top-[80px] ds:left-0 ds:right-0 ds:bottom-0 ds:z-40 ds:flex ds:flex-col ds:bg-core-white ds:h-[calc(100vh-80px)] ds:overflow-y-auto"
        >
          <div className="ds:flex ds:flex-col ds:flex-grow ds:p-4 ds:space-y-0 ds:bg-core-white">
            {links.map((link, index) => {
              const isLast = index === links.length - 1;
              const containerClass = isLast
                ? "ds:border-b ds:border-b-ui-grey-300"
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
                        className={`ds:md:hidden ds:hover:underline ds:flex ds:items-center ds:py-4 ds:justify-between ds:min-h-[3.5rem] ds:w-full ds:text-[26px] 
                          ds:font-bold ds:border-t ds:border-t-ui-grey-300 ds:cursor-pointer ds:transition-colors ds:duration-200 ds:group 
                          ${
                            openDropdownMobile === link.name
                              ? "ds:underline"
                              : "ds:text-core-black"
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
                          className="ds:space-y-2 ds:mb-4 ds:md:hidden"
                        >
                          {link.dropdownLinks.map((subLink) => (
                            <Link key={subLink.name} href={subLink.href ?? "#"}>
                              <span className="ds:block ds:text-[20px] ds:font-bold ds:text-core-black ds:cursor-pointer ds:hover:underline ds:py-2 ds:px-0">
                                {subLink.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link href={link.href ?? "#"} passHref className="ds:block">
                      <span
                        className="ds:flex ds:items-center ds:hover:underline ds:justify-between ds:min-h-[3.5rem] ds:py-4 ds:w-full ds:text-[26px] ds:font-bold 
                      ds:text-core-black ds:bg-core-white ds:border-t ds:border-t-ui-grey-300 ds:cursor-pointer"
                      >
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
