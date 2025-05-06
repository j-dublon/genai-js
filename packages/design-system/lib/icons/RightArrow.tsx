export const RightArrow = ({
  className,
  color = "#1F1F1F",
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 24"
      fill="none"
      className={`w-5 h-5 md:w-6 md:h-6 ${className}`}
    >
      <g clipPath="url(#clip0_3478_4298)">
        <path
          d="M24.5 11.9353L15.5647 20.8706L12.88 18.1858L17.2307 13.8351H0.5V10.0397H17.2349L12.8841 5.68476L15.5647 3L24.5 11.9353Z"
          fill={color}
        />
      </g>
    </svg>
  );
};
