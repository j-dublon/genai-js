import React from "react";

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
  const getStarStatus = (trustScore: number) => {
    if (trustScore >= 1 && trustScore <= 1.2) return { full: 1, half: false };
    if (trustScore >= 1.3 && trustScore <= 1.7) return { full: 1, half: true };
    if (trustScore >= 1.8 && trustScore <= 2.2) return { full: 2, half: false };
    if (trustScore >= 2.3 && trustScore <= 2.7) return { full: 2, half: true };
    if (trustScore >= 2.8 && trustScore <= 3.2) return { full: 3, half: false };
    if (trustScore >= 3.3 && trustScore <= 3.7) return { full: 3, half: true };
    if (trustScore >= 3.8 && trustScore <= 4.2) return { full: 4, half: false };
    if (trustScore >= 4.3 && trustScore <= 4.7) return { full: 4, half: true };
    if (trustScore >= 4.8 && trustScore <= 5) return { full: 5, half: false };
    return { full: 0, half: false };
  };

  const { full, half } = getStarStatus(trustScore);

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
