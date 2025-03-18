import { ChevronVertical } from "@icons/ChevronVertical";
import cx from "classnames";
import Link from "next/link";

interface DropdownMenuProps {
  name: string;
  dropdownLinks: { name: string; href?: string; external?: boolean }[];
  openDropdown: string | null;
  setOpenDropdown: (name: string | null) => void;
  useDropdown: (
    name: string,
    openDropdown: string | null,
    setOpenDropdown: (name: string | null) => void,
  ) => { isOpen: boolean; dropdownRef: React.RefObject<HTMLDivElement> };
}

export const DropdownMenu = ({
  name,
  dropdownLinks,
  openDropdown,
  setOpenDropdown,
  useDropdown,
}: DropdownMenuProps) => {
  const { isOpen, dropdownRef } = useDropdown(
    name,
    openDropdown,
    setOpenDropdown,
  );
  const formattedName = name.toLowerCase().replace(/\s+/g, "-");
  const dropdownId = `dropdown-${formattedName}`;

  return (
    <div
      className="ds:relative ds:flex ds:items-center ds:justify-center"
      ref={dropdownRef}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenDropdown(isOpen ? null : name);
        }}
        className="ds:py-2 ds:px-4 ds:rounded-md ds:text-[16px] ds:font-semibold ds:leading-[26px] ds:text-core-black ds:flex ds:items-center ds:gap-2 ds:hover:text-gray-600
        ds:transition-all ds:duration-250 ds:active:translate-y-[5px]"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={dropdownId}
      >
        {name}
        <ChevronVertical
          width={14}
          height={26}
          className={`ds:transition-transform ds:duration-300 ${isOpen ? "ds:rotate-180" : ""}`}
        />
      </button>

      <div
        id={dropdownId}
        role="menu"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        className={`ds:bg-ui-grey-200 ds:rounded-sm ds:p-6 
        ds:absolute ds:left-1/2 ds:top-full ds:w-fit ds:z-[100] 
        ds:transform ds:-translate-x-1/2 ds:transition-all ds:duration-300
        ${
          isOpen
            ? "ds:opacity-100 ds:translate-y-0 ds:visible"
            : "ds:opacity-0 ds:translate-y-[-10px] ds:invisible ds:pointer-events-none"
        }`}
      >
        <div className="ds:flex ds:flex-col ds:text-left ds:whitespace-nowrap ds:font-bold">
          {dropdownLinks.map(({ name: subName, href, external }, index) => {
            const notFirstItem = index !== 0;
            return external ? (
              <a
                key={subName}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                role="menuitem"
                className={cx(
                  "ds:block ds:text-gray-800 ds:hover:bg-gray-100",
                  {
                    "ds:mt-4": notFirstItem,
                  },
                )}
              >
                {subName}
              </a>
            ) : (
              <Link
                key={subName}
                href={href ?? "#"}
                className={cx(
                  "ds:block ds:text-gray-800 ds:hover:bg-gray-100",
                  {
                    "ds:mt-4": notFirstItem,
                  },
                )}
              >
                {subName}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
