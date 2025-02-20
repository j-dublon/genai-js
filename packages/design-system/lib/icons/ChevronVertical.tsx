interface ChevronVerticalProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

//This is a chevron that can be toggled up and down without a circle around it
export const ChevronVertical = ({
  width = 32,
  height = 33,
  fill = "#1F1F1F",
  className = "",
}: ChevronVerticalProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ${className}`}
    >
      <path
        d="M30.6667 11.2943L16 25.9609L1.33335 11.2943L4.45258 8.17503L16 19.7261L27.5511 8.17503L30.6667 11.2943Z"
        fill={fill}
      />
    </svg>
  );
};
