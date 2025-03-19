interface TwitterIconProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const TwitterIcon = ({
  width = 25,
  height = 21,
  fill = "#1F1F1F",
}: TwitterIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 51"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.7233 22.4207L43.294 5.4834H39.8412L27.1894 20.1898L17.0845 5.4834H5.42969L20.7103 27.7221L5.42969 45.4834H8.88268L22.2433 29.9529L32.9148 45.4834H44.5696L28.7224 22.4207H28.7233ZM23.9939 27.918L22.4457 25.7035L10.1268 8.08276H15.4304L25.3719 22.3033L26.9201 24.5178L39.8428 43.0023H34.5392L23.9939 27.9188V27.918Z"
        fill="#1F1F1F"
      />
    </svg>
  );
};
