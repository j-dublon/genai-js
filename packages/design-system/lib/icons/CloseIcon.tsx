interface CloseIconProps {
  width?: number;
  height?: number;
  outlineColor?: string;
  color?: string;
}

export const CloseIcon = ({
  width = 40,
  height = 40,
  outlineColor = "#DBD8D0",
  color = "#1F1F1F",
}: CloseIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className="ds:max-w-[32px] ds:max-h-[32px] ds:md:max-w-[40px] ds:md:max-h-[40px]"
      viewBox="0 0 40 40"
      fill="none"
    >
      <circle
        cx="20"
        cy="20"
        r="19.375"
        stroke={outlineColor}
        strokeWidth="1.25"
      />
      <path
        d="M13.571 13.25L20.321 20L13.571 26.75"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M27.179 13.25L20.429 20L27.179 26.75"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
};
