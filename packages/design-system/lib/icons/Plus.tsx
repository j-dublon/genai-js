export const Plus = ({
  width = 16,
  height = 16,
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
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M9.69302 6.30472H16L15.9963 9.68783H9.69302V16H6.3107V9.69156H0V6.30844H6.30698V0L9.6893 0.00372167V6.30472H9.69302Z"
      fill={fill}
    />
  </svg>
);
