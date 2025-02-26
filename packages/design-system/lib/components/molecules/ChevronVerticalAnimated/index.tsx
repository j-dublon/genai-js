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
      className={`relative flex items-center justify-center w-9 h-9 rounded-full border-2 border-ui-grey-200 
        transition-colors duration-300
        ${isOpen ? "bg-core-black text-core-white" : "bg-core-white text-gray-900"}
        hover:bg-ui-grey-200 cursor-pointer`}
      aria-hidden="true"
      aria-expanded={isOpen}
      aria-label={ariaLabel}
      aria-controls={ariaControls}
      id={buttonId}
    >
      <span
        className={`inline-block w-4 h-4 transition-transform duration-500 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          className="w-full h-full"
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
