import { ChevronVerticalWithCircle } from "@icons/ChevronVerticalWithCircle";
import { TickWithCircle } from "@icons/TickWithCircle";
import { forwardRef } from "react";

export interface CustomInputProps {
  isOpen: boolean;
  placeholderText: string;
  setIsOpen: (arg0: boolean) => void;
  value?: string;
  showTick?: boolean;
  className?: string;
  disabled?: boolean;
}

export const DropdownInputField = forwardRef<
  HTMLButtonElement,
  CustomInputProps
>(
  (
    {
      value,
      placeholderText,
      isOpen,
      setIsOpen,
      showTick = true,
      className,
      disabled = false,
    },
    ref,
  ) => (
    <button
      className={`ds:border ds:border-ui-grey-400 ds:rounded-xs ds:p-4 ds:w-full ds:h-16 ds:flex ds:justify-between ds:items-center ${className} ${disabled ? "cursor-not-allowed" : ""}`}
      onClick={
        disabled
          ? undefined
          : () => {
              setIsOpen(!isOpen);
            }
      }
      type="button"
      ref={ref}
    >
      <span className={`${!value ? "text-ui-grey-500" : ""}`}>
        {value || placeholderText}
      </span>
      <div className="ds:flex ds:justify-between ds:items-center ds:gap-2.5">
        {value && showTick && (
          <div
            data-testid="tick-icon"
            className={`ds:right-6 ds:transform ds:pointer-events-none`}
          >
            <TickWithCircle width={22} height={22} circleFill={"#009EA8"} />
          </div>
        )}
        <div
          data-testid="arrow-icon"
          className={`ds:right-4 ds:transform ds:pointer-events-none ${
            isOpen ? "ds:rotate-180" : ""
          }`}
        >
          <ChevronVerticalWithCircle
            width={32}
            height={32}
            borderColor="#DBD8D0"
          />
        </div>
      </div>
    </button>
  ),
);

DropdownInputField.displayName = "Dropdown input";
