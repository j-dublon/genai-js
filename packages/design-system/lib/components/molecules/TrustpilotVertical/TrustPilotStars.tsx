import { getTrustPilotStarStatus } from "@utils/getTrustPilotStarStatus";

interface TrustpilotStarsProps {
  trustScore: number;
  width?: number;
  height?: number;
}

export const TrustpilotStars: React.FC<TrustpilotStarsProps> = ({
  trustScore,
  width,
  height,
}) => {
  const { full, half } = getTrustPilotStarStatus(trustScore);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 520 96"
      width={width}
      height={height}
      role="img"
      aria-label={`Trustpilot stars: ${full} full star(s)${
        half ? " and a half-star" : ""
      }`}
    >
      {[...Array(5)].map((_, i) => (
        <g key={i} transform={`translate(${i * 104}, 0)`}>
          <rect
            x="0"
            y="0"
            width="96"
            height="96"
            fill={i < full || (i === full && half) ? "#00b67a" : "#DCDCE6"}
          />
          {i === full && half && (
            <rect x="0" y="0" width="48" height="96" fill="#00b67a" />
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
