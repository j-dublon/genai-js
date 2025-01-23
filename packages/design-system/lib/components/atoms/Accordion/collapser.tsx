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
        className="bg-transparent border-none cursor-pointer w-full"
        type="button"
      >
        {toggle}
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          FAQDropdownOpen
            ? "max-h-[1000px] opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        }`}
      >
        {close && (
          <div
            className="cursor-pointer float-right"
            onClick={() => setFAQDropdownOpen(!FAQDropdownOpen)}
          >
            {close}
          </div>
        )}
        {children}
      </div>
    </>
  );
};
