interface HamburgerProps {
  width?: number;
  height?: number;
  hasCircle: boolean;
  className?: string;
  fill?: string;
}

export const Hamburger = ({
  width = 44,
  height = 44,
  hasCircle,
  className = "",
  fill = "none",
}: HamburgerProps) => {
  return hasCircle ? (
    <svg
      width={width}
      height={height}
      viewBox="0 0 44 44"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        opacity="0.15"
        cx="22"
        cy="22"
        r="21.5"
        transform="matrix(-1 0 0 1 44 0)"
        stroke="#1F1F1F"
      />
    </svg>
  ) : (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 15"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line
        x1="1"
        y1="1.22266"
        x2="19"
        y2="1.22266"
        stroke="#1F1F1F"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <line
        x1="1"
        y1="7.22266"
        x2="19"
        y2="7.22266"
        stroke="#1F1F1F"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <line
        x1="1"
        y1="13.2227"
        x2="19"
        y2="13.2227"
        stroke="#1F1F1F"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
};
