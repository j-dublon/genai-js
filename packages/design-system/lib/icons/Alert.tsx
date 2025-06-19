export const Alert = ({
  width = 20,
  height = 20,
  color = "#DB3737",
  className = "",
}: {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 20 21"
      fill="none"
    >
      <g clipPath="url(#clip0_3510_33850)">
        <path
          d="M10 18.6375C14.5232 18.6375 18.1824 14.9783 18.1824 10.4551C18.1824 5.93184 14.5232 2.27267 10 2.27267C5.47676 2.27267 1.81758 5.93184 1.81758 10.4551C1.81758 14.9783 5.47676 18.6375 10 18.6375ZM10 0.455079C15.5226 0.45508 20 4.9325 20 10.4551C20 15.9777 15.5226 20.4551 10 20.4551C4.47742 20.4551 -1.51592e-06 15.9777 -1.03312e-06 10.4551C-5.50321e-07 4.9325 4.47742 0.455079 10 0.455079ZM10.9099 12.2727L9.09011 12.2727L9.09011 5.45399L10.9077 5.45399L10.9077 12.2727L10.9099 12.2727ZM10.9099 15.4562L9.09011 15.4562L9.09011 13.6386L10.9077 13.6386L10.9077 15.4562L10.9099 15.4562Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_3510_33850">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(20 20.4551) rotate(-180)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
