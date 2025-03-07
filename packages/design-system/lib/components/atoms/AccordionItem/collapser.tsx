interface CollapserProps {
  close?: React.ReactNode;
  direction?: "up" | "down";
  isOpen?: boolean;
  toggle: React.ReactNode;
  children: React.ReactNode;
  FAQDropdownOpen: boolean;
  setFAQDropdownOpen: (arg0: boolean) => void;
}

export const Collapser = ({
  toggle,
  children,
  close,
  FAQDropdownOpen,
  setFAQDropdownOpen,
}: CollapserProps) => {
  return (
    <>
      <button
        onClick={() => setFAQDropdownOpen(!FAQDropdownOpen)}
        className="ds:bg-transparent ds:border-none ds:cursor-pointer ds:w-full"
        type="button"
        aria-label={`${FAQDropdownOpen ? "close" : "open"} faq section`}
      >
        {toggle}
      </button>
      <div
        data-testid="collapser-content"
        className={`ds:transition-all ds:duration-500 ds:ease-in-out ds:overflow-hidden ${
          FAQDropdownOpen
            ? "ds:max-h-[1000px] ds:opacity-100 ds:visible"
            : "ds:max-h-0 ds:opacity-0 ds:hidden"
        }`}
      >
        {close && (
          <div
            className="ds:cursor-pointer ds:float-right"
            onClick={() => setFAQDropdownOpen(!FAQDropdownOpen)}
            aria-label="close faq section"
          >
            {close}
          </div>
        )}
        {children}
      </div>
    </>
  );
};
