interface ChevronVerticalWithCircleIconProps {
  width?: number;
  height?: number;
  chevronColor?: string;
  DropdownOpen?: boolean;
  borderColor?: string;
  backgroundColor?: string;
}

//This is a chevron that can be toggled up and down, and has a faint circle around it
export const ChevronVerticalWithCircle = ({
  width = 64,
  height = 65,
  chevronColor = "#1F1F1F",
  DropdownOpen = false,
  borderColor = "#1F1F1F1A",
  backgroundColor = "none",
}: ChevronVerticalWithCircleIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 65"
      fill={backgroundColor}
      xmlns="http://www.w3.org/2000/svg"
      className={`ds:transition-transform ds:duration-300 ${
        DropdownOpen ? "ds:rotate-180" : ""
      }`}
      aria-label="arrow with circle icon"
    >
      <circle
        cx="32"
        cy="32.6458"
        r="31"
        stroke={borderColor}
        transform="rotate(90 32 32.6458)"
        strokeWidth="2"
      />
      <path
        d="M43.8125 28.3958L32 40.2083L20.1875 28.3958"
        stroke={chevronColor}
        strokeWidth="4"
        strokeLinecap="square"
      />
    </svg>
  );
};
