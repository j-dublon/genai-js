interface TickIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const Tick: React.FC<TickIconProps> = ({
  width = 20,
  height = 20,
  fill = "#1F1F1F",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 19"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.136 11.3878C10.0549 11.4676 9.91985 11.4676 9.83611 11.3878L4.29009 5.93376L0.5 9.6655L6.04602 15.1222L9.98739 19.0002L25.1667 4.06258L21.3739 0.333496L10.136 11.3878Z" />
    </svg>
  );
};
