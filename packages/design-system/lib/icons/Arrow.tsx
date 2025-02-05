interface ArrowIconProps {
  width?: number;
  height?: number;
  fill?: string;
  FAQDropdownOpen?: boolean;
}

export const Arrow = ({
  width = 42,
  height = 42,
  fill = "#1F1F1F",
  FAQDropdownOpen = false
}: ArrowIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 42 43"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ${
        FAQDropdownOpen ? "rotate-180" : ""
      }`}
      aria-label="arrow icon"
    >
      <path
        d="M32.8125 16.8311L21 28.6436L9.1875 16.8311"
        stroke={fill}
        strokeWidth="4"
        strokeLinecap="square"
      />
    </svg>
  );
};
