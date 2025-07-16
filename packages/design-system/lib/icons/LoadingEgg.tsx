export interface LoadingEggProps {
  className?: string;
  height?: number;
  width?: number;
  color?: string;
}

export const LoadingEgg = ({
  className,
  width,
  height = 40,
  color = "#1F1F1F",
}: LoadingEggProps) => {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      height={height}
      viewBox="240 204 496 659"
      width={width}
    >
      <path
        className="animate-egg"
        style={{
          strokeDasharray: "500 802",
          strokeDashoffset: 1302,
          strokeLinecap: "round",
        }}
        d="M455.579 298.001C453.461 297.988 451.345 298.112 449.243 298.37C413.131 302.838 374.285 348.49 345.409 420.445C317.066 490.989 303.562 576.18 311.031 637.385C321.801 725.834 404.028 780.858 506.495 768.194C557.346 761.878 601.127 740.48 629.869 707.727C643.497 692.337 653.669 674.168 659.694 654.458C665.719 634.747 667.454 613.96 664.781 593.513C657.312 532.342 623.767 452.996 579.319 391.421C536.605 332.332 490.957 298.001 455.579 298.001Z"
        stroke={color}
        strokeWidth={38}
      />
    </svg>
  );
};
