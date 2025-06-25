export const CheckboxIcon = ({
  className,
  width = 29,
  height = 28,
  fill = "#1F1F1F",
}: {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 29 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="1.75"
        y="1.25"
        width="25.5"
        height="25.5"
        rx="3.75"
        fill={fill}
        stroke={fill}
        strokeWidth="2.5"
      />
      <path
        d="M12.5001 15L9.1001 11.5L6.6001 14L12.5001 20L22.0001 10.5L19.5001 8L12.5001 15Z"
        fill="white"
      />
      <path
        d="M12.5 20L6.5 14L9 11.5L12.5 15L19.5 8L22 10.5L12.5 20Z"
        fill="white"
      />
    </svg>
  );
};
