interface ChevronVerticalAnimatedProps {
  isOpen?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
  ariaLabel?: string;
  ariaControls?: string;
  buttonId?: string;
  asChild?: boolean;
}

export const ChevronVerticalAnimated = ({
  isOpen = false,
  onClick,
  ariaLabel = "Toggle menu",
  ariaControls,
  buttonId,
  asChild = false,
}: ChevronVerticalAnimatedProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick?.();
    }
  };

  const chevronIcon = (
    <span
      role="button"
      tabIndex={0}
      onClick={(e) => onClick?.(e)}
      onKeyDown={handleKeyDown}
      className={`ds:relative ds:flex ds:items-center ds:justify-center ds:w-9 ds:h-9 ds:rounded-full ds:border-2 ds:border-ui-grey-200 
        ds:transition-colors ds:duration-300
        ${isOpen ? "ds:bg-core-black ds:text-core-white" : "ds:bg-core-white ds:text-gray-900"}
        ds:hover:bg-ui-grey-200 ds:cursor-pointer`}
      aria-hidden="true"
      aria-expanded={isOpen}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      id={buttonId}
    >
      <span
        className={`ds:inline-block ds:w-4 ds:h-4 ds:transition-transform ds:duration-500 ${
          isOpen ? "ds:rotate-180" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          className="ds:w-full ds:h-full"
        >
          <path
            d="M12,3.64l-6,6-6-6L1.28,2.36,6,7.09l4.73-4.73Z"
            fill="currentColor"
          />
        </svg>
      </span>
    </span>
  );

  if (asChild) {
    return chevronIcon;
  }

  return chevronIcon;
};
