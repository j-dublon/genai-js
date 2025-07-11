interface TickWithCircleIconProps {
  minX?: number;
  minY?: number;
  width?: number;
  height?: number;
  circleFill?: string;
  tickFill?: string;
}

export const TickWithCircle = ({
  minX = 0,
  minY = 0,
  width = 22,
  height = 22,
  circleFill = "currentColor",
  tickFill = "white",
}: TickWithCircleIconProps) => (
  <svg
    width={width}
    height={width}
    viewBox={`${minX} ${minY} ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Group 3393">
      <circle
        id="Ellipse 316"
        cx="11"
        cy="11"
        r="11"
        fill={circleFill}
        stroke={tickFill}
      />
      <path
        id="Vector 23"
        d="M5.5 11L8.9375 14.4375L15.8125 7.5625"
        stroke={tickFill}
        strokeWidth="1.5"
      />
    </g>
  </svg>
);
