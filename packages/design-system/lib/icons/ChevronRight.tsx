interface ChevronRightProps {
  className?: string;
  width?: number;
  height?: number;
}

export const ChevronRight = ({
  width = 48,
  height = 48,
}: ChevronRightProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Icon / Chevron Right Big">
        <path
          id="Vector"
          d="M15.6789 2.15063L37.6789 24.1506L15.6789 46.1506L11 41.4718L28.3267 24.1506L11 6.82398L15.6789 2.15063Z"
          fill="#1F1F1F"
        />
      </g>
    </svg>
  );
};
