interface OfferIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const OfferIcon = ({
  width = 20,
  height = 20,
  fill = "#1F1F1F",
}: OfferIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 36 37"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.6642 4.04354L17.5648 4.04346L3.61424 17.9935L18.5766 32.956L32.3856 19.1471V4.7647L31.6642 4.04354ZM23.4786 9.52937C24.4624 8.54562 26.0573 8.54562 27.0411 9.52937C28.0249 10.5131 28.0249 12.1081 27.0411 13.0919C26.0573 14.0756 24.4624 14.0756 23.4786 13.0919C22.4948 12.1081 22.4948 10.5131 23.4786 9.52937Z"
        fill="#1F1F1F"
      />
    </svg>
  );
};
