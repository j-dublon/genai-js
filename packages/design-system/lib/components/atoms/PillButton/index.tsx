import { ChevronVertical } from "@lib/icons";
import { BackgroundColors } from "@lib/types";
import { bgColorVariants } from "@lib/variants";

export interface PillButtonProps {
  buttonText: string;
  backgroundColor: BackgroundColors;
  type: "button" | "dropdown";
  ariaLabel?: string;
  className?: string;
  whiteText?: boolean;
  noPadding?: boolean;
  icon?: React.ReactNode;
  onSelect: (value?: string) => Promise<void> | void;
  dropDownOptions?: { label: string; value: string }[];
  dropDownOpen?: boolean;
  setDropDownOpen?: (open: boolean) => void;
  isLoading?: boolean;
}

export const PillButton = ({
  buttonText,
  backgroundColor = "black",
  ariaLabel,
  className = "",
  whiteText = false,
  noPadding = false,
  type = "button",
  icon,
  onSelect,
  dropDownOpen,
  setDropDownOpen,
  dropDownOptions,
  isLoading = false,
}: PillButtonProps) => {
  const isDropdown = type === "dropdown";
  // TODO: Possibly replace loading text with egg spinner, or handle passing down a loading spinner component

  return (
    <div className="flex flex-col w-fit">
      <button
        onClick={
          isDropdown && setDropDownOpen
            ? () => setDropDownOpen(!dropDownOpen)
            : () => onSelect()
        }
        className={`ds:cursor-pointer ds:flex ds:flex-row ds:gap-3 ds:items-center ds:justify-between ds:rounded-[40px] ds:w-fit ds:border-2 ds:border-core-black ${!noPadding && "ds:px-4 ds:py-2"} ${bgColorVariants[backgroundColor]} ${className} ${dropDownOpen && "ds:rounded-b-none ds:rounded-t-lg ds:w-full"}`}
        aria-label={ariaLabel ?? `Pill button with the text ${buttonText}`}
        disabled={isLoading}
      >
        <h1
          className={`ds:font-medium ds:text-xs ${whiteText ? "ds:text-core-white" : "ds:text-core-black"}`}
        >
          {isLoading ? "Loading..." : buttonText}
        </h1>
        {isDropdown ? (
          <ChevronVertical
            width={16}
            height={16}
            fill={whiteText ? "#FFFFFF" : "#1F1F1F"}
            className={`${dropDownOpen && "ds:rotate-180"}`}
          />
        ) : (
          (icon ?? null)
        )}
      </button>
      {isDropdown && dropDownOpen && (
        <div
          data-testid="dropdown-options"
          className={`${bgColorVariants[backgroundColor]} ds:flex ds:flex-col ds:rounded-b-lg ds:z-10 ds:w-fit ds:p-4 ${whiteText ? "ds:text-core-white" : "ds:text-core-black"}`}
        >
          {dropDownOptions?.map((option) => (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className="ds:text-left ds:hover:underline ds:cursor-pointer"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
