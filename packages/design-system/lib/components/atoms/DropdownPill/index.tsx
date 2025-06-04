import { ChevronVertical } from "@icons/ChevronVertical";
import { BackgroundColors } from "@lib/types";
import { bgColorVariants } from "@lib/variants";
import cx from "classnames";

export interface DropdownPillProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value: string;
  setValue: (value: string) => void;
  options: string[];
  backgroundColor?: BackgroundColors;
  ariaLabel?: string;
  className?: string;
  whiteText?: boolean;
  noPadding?: boolean;
}

export const DropdownPill = ({
  backgroundColor = "white",
  value,
  setValue,
  options,
  ariaLabel,
  className,
  whiteText = false,
  noPadding = false,
  isOpen = false,
  setIsOpen,
}: DropdownPillProps) => {
  return (
    <div className="ds:relative ds:w-fit">
      <button
        className={cx(
          "ds:flex ds:flex-row ds:gap-3 ds:items-center ds:w-fit",
          isOpen ? "ds:rounded-lg ds:rounded-b-none" : "ds:rounded-[40px]",
          !noPadding && "ds:px-4 ds:py-2",
          bgColorVariants[backgroundColor],
          className,
        )}
        aria-label={`Dropdown menu pill with the text ${value}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h1
          className={cx(
            "ds:font-semibold ds:text-xxs",
            whiteText ? "ds:text-core-white" : "ds:text-core-black",
          )}
          aria-label={
            ariaLabel ? ariaLabel : `Dropdown menu pill text ${value}`
          }
        >
          {value}
        </h1>
        <ChevronVertical
          width={16}
          height={16}
          className={isOpen ? "ds:rotate-180" : ""}
          fill={whiteText ? "#FFFFFF" : "#1F1F1F"}
        />
      </button>
      {isOpen && (
        <div
          className={`ds:absolute ds:top-full ds:left-0 ds:w-full ds:text-xxs ds:flex ds:flex-col ds:gap-2 ds:rounded-b-lg ds:py-2 ${noPadding ? "" : "ds:px-4"} ${bgColorVariants[backgroundColor]}`}
        >
          {options.map((option) => (
            <button
              key={option}
              className={`ds:text-left ds:rounded-sm ds:hover:font-medium ds:cursor-pointer ${whiteText ? "ds:text-ui-grey-100 ds:hover:text-core-white" : "ds:text-ui-grey-500 ds:hover:text-core-black"}`}
              onClick={() => {
                setValue(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
