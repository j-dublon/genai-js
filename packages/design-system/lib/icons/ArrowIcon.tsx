export const ArrowIcon = ({
  height = 21,
  width = 21,
  className = "",
  backgroundColor = "#FFFFFF",
  innerFill = "#1F1F1F",
  direction = "down",
}: {
  height?: number;
  width?: number;
  className?: string;
  backgroundColor?: string;
  innerFill?: string;
  direction?: "up" | "down";
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="11" cy="11" r="10.5" fill={backgroundColor} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.95 4.5V14.2229L14.8317 11.3703L16.1683 12.7206L11.6683 17.1752H10.3317L5.83167 12.7206L7.16833 11.3703L10.05 14.2229V4.5H11.95Z"
        fill={innerFill}
        transform={direction === "up" ? "rotate(180 11 11)" : ""}
      />
    </svg>
  );
};
