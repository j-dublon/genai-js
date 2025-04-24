export const InfoIcon = ({
  width = 21,
  height = 21,
  color = "#5A06D8",
  className = "",
}: {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="Icon / Info" clipPath="url(#clip0_3243_433)">
        <path
          id="Vector"
          d="M10.5 1.81759C5.97676 1.81759 2.31759 5.47676 2.31759 10C2.31759 14.5232 5.97676 18.1824 10.5 18.1824C15.0232 18.1824 18.6824 14.5232 18.6824 10C18.6824 5.47676 15.0232 1.81759 10.5 1.81759ZM10.5 20C4.97742 20 0.5 15.5226 0.5 10C0.5 4.47742 4.97742 0 10.5 0C16.0226 0 20.5 4.47742 20.5 10C20.5 15.5226 16.0226 20 10.5 20ZM9.59011 8.18241H11.4099V15.0011H9.5923V8.18241H9.59011ZM9.59011 4.99891H11.4099V6.81649H9.5923V4.99891H9.59011Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_3243_433">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
