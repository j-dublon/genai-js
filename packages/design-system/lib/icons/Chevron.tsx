interface ChevronProps {
  chevronWithCircle?: boolean;
  className?: string;
}

export const Chevron = ({
  chevronWithCircle = true,
  className = "",
}: ChevronProps) => {
  return (
    <svg
      width="49"
      height="49"
      viewBox="0 0 49 49"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {chevronWithCircle ? (
        <>
          <circle cx="24.5" cy="24.459" r="24" fill="#1F1F1F" />
          <path
            d="M21.3125 15.5996L30.1719 24.459L21.3125 33.3184"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="square"
          />
        </>
      ) : (
        <path
          d="M15.6789 2.15063L37.6789 24.1506L15.6789 46.1506L11 41.4718L28.3267 24.1506L11 6.82398L15.6789 2.15063Z"
          fill="#1F1F1F"
        />
      )}
    </svg>
  );
};
