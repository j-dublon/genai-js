interface ChevronVerticalWithCircleIconProps {
  width?: number;
  height?: number;
  fill?: string;
  DropdownOpen?: boolean;
}

//This is a chevron that can be toggled up and down, and has a faint circle around it
export const ChevronVerticalWithCircle = ({
  width = 64,
  height = 65,
  fill = "#1F1F1F",
  DropdownOpen = false,
}: ChevronVerticalWithCircleIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`ds:transition-transform ds:duration-300 ${
        DropdownOpen ? "ds:rotate-180" : ""
      }`}
      aria-label="arrow with circle icon"
    >
      <circle
        opacity="0.1"
        cx="32"
        cy="32.6458"
        r="31"
        transform="rotate(90 32 32.6458)"
        stroke={fill}
        strokeWidth="2"
      />
      <path
        d="M43.8125 28.3958L32 40.2083L20.1875 28.3958"
        stroke={fill}
        strokeWidth="4"
        strokeLinecap="square"
      />
    </svg>
  );
};
