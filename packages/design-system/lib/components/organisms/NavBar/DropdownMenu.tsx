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

  return (
    <div className="ds:relative ds:flex ds:items-center" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenDropdown(isOpen ? null : name);
        }}
        className="ds:py-2 ds:px-4 ds:rounded-md ds:text-[16px] ds:font-semibold ds:leading-[26px] ds:text-core-black ds:transition-colors ds:duration-200 ds:flex ds:items-center ds:gap-2 ds:hover:text-gray-600"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {name}
        <ChevronVertical
          width={14}
          height={26}
          className={`ds:transition-transform ds:duration-300 ${isOpen ? "ds:rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="ds:bg-ui-grey-200 ds:block ds:rounded-sm ds:p-6 
          ds:absolute ds:left-[60%] ds:top-full ds:w-fit ds:z-[100] 
          ds:transform ds:-translate-x-1/2 ds:transition-opacity ds:duration-100 ds:ease-in ds:delay-[10ms]"
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
      )}
    </div>
  );
};
