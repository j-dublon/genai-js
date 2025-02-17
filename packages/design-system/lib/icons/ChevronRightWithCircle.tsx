export interface ChevronRightWithCircleProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
  innerFill?: string;
}

export const ChevronRightWithCircle = ({
  width = 36,
  height = 37,
  backgroundColor = "#1F1F1F",
  innerFill = "#FFFFFF",
}: ChevronRightWithCircleProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="18"
        cy="18"
        r="18"
        transform="matrix(-1 0 0 1 36 0.164062)"
        fill={backgroundColor}
      />
      <path
        d="M14 10L22 18L14 26"
        stroke={innerFill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
