import { ChevronVertical } from "@icons/ChevronVertical";
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
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenDropdown(isOpen ? null : name);
        }}
        className="py-2 px-4 rounded-md text-[16px] font-semibold leading-[26px] text-black transition-colors duration-200 flex items-center gap-2 hover:text-gray-600"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {name}
        <ChevronVertical
          width={14}
          height={26}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="bg-ui-grey-200 block rounded-[12px] p-[16px] 
          absolute left-1/2 top-full min-w-[180px] max-w-[400px] z-[100] 
          transform -translate-x-1/2 transition-opacity duration-100 ease-in delay-[10ms]"
        >
          <div className="flex flex-col text-left whitespace-nowrap font-bold">
            {dropdownLinks.map(({ name: subName, href, external }) =>
              external ? (
                <a
                  key={subName}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
                >
                  {subName}
                </a>
              ) : (
                <Link
                  key={subName}
                  href={href ?? "#"}
                  className="block py-2 px-4 text-gray-800 hover:bg-gray-100"
                >
                  {subName}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};
