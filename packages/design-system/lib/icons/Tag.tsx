export const Tag = ({
  height = 14,
  width = 15,
  fill = "#1F1F1F",
  className,
}: {
  height?: number;
  width?: number;
  fill?: string;
  className?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15 14"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.149 3.86689e-05L7.28829 0L0.5 6.7549L7.78061 14L14.5 7.31349V0.349239L14.149 3.86689e-05ZM10.1659 2.65638C10.6446 2.18003 11.4207 2.18003 11.8994 2.65638C12.3781 3.13274 12.3781 3.90506 11.8994 4.38141C11.4207 4.85777 10.6446 4.85777 10.1659 4.38141C9.68721 3.90506 9.68721 3.13274 10.1659 2.65638Z"
        fill={fill}
      />
    </svg>
  );
};
