import { getTrustpilotStarStatus } from "@lib/hooks/getTrustpilotStarStatus";

interface TrustpilotStarsProps {
  trustScore: number;
  width?: number;
  height?: number;
}

export const TrustpilotStars = ({ trustScore }: TrustpilotStarsProps) => {
  const { full, half } = getTrustpilotStarStatus(trustScore);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 96"
      role="img"
      aria-label={`Trustpilot stars: ${full} full star(s)${
        half ? " and a half-star" : ""
      }`}
      className="ds:w-full ds:h-5 ds:md:h-[25px]"
    >
      <defs>
        <mask id="half-mask">
          <rect x="0" y="0" width="48" height="96" fill="white" />
          <rect x="48" y="0" width="48" height="96" fill="black" />
        </mask>
      </defs>
      {[...Array(5)].map((_, i) => (
        <g key={i} transform={`translate(${i * 104}, 0)`}>
          <rect
            x="0"
            y="0"
            width="96"
            height="96"
            fill={
              i < full ? "#00b67a" : i === full && half ? "#DCDCE6" : "#DCDCE6"
            }
          />
          {i === full && half && (
            <rect
              x="0"
              y="0"
              width="96"
              height="96"
              fill="#00b67a"
              mask="url(#half-mask)"
            />
          )}
          <path
            d="M48 64.7L62.6 61l6.1 18.8zm33.6-24.3H55.9L48 16.2l-7.9 24.2H14.4l20.8 15-7.9 24.2 20.8-15 12.8-9.2z"
            fill="#FFFFFF"
          />
        </g>
      ))}
    </svg>
  );
};
