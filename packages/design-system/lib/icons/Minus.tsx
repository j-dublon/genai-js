export const Minus = ({
  width = 16,
  height = 4,
  fill = "#FFFFFF",
}: {
  width?: number;
  height?: number;
  fill?: string;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 16 4"
    fill="none"
  >
    <path d="M0 0H16L15.9963 4H0V0Z" fill={fill} />
  </svg>
);
