export const Arrow = ({
  className = "w-5 h-5 md:w-6 md:h-6",
  color = "#1F1F1F",
  direction = "right",
}: {
  className?: string;
  color?: string;
  direction?: "up" | "down" | "left" | "right";
}) => {
  const rotation =
    direction === "down"
      ? "rotate(90 12.5 12)"
      : direction === "left"
        ? "rotate(180 12.5 12)"
        : direction === "up"
          ? "rotate(270 12.5 12)"
          : "";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25 24"
      fill="none"
      className={className}
    >
      <g clipPath="url(#clip0_3478_4298)">
        <path
          d="M24.5 11.9353L15.5647 20.8706L12.88 18.1858L17.2307 13.8351H0.5V10.0397H17.2349L12.8841 5.68476L15.5647 3L24.5 11.9353Z"
          fill={color}
          transform={rotation}
        />
      </g>
    </svg>
  );
};
