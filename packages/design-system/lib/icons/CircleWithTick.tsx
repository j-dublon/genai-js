interface CircleWithTickProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const CircleWithTick = ({
  width = 20,
  height = 20,
  fill = "currentColor",
}: CircleWithTickProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill}
    >
      <g clipPath="url(#a)">
        <path
          fill="#1F1F1F"
          d="M9 .5a9.001 9.001 0 0 0 0 18 9.001 9.001 0 0 0 0-18Zm0 16.364A7.365 7.365 0 0 1 9 2.136a7.365 7.365 0 0 1 0 14.728Zm2.826-10.4 1.256 1.254L8.06 12.74l-1.305-1.305-1.835-1.834 1.255-1.255 1.834 1.834a.07.07 0 0 0 .1 0l3.718-3.717Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 .5h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
