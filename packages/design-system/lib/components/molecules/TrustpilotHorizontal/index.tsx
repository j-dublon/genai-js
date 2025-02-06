import { TrustpilotStars } from "@components/atoms/TrustpilotStars";
import { TrustpilotLogo } from "@icons/TrustpilotLogo";
import cx from "classnames";

interface TrustPilotHorizontalProps {
  width: number;
  height: number;
  trustScore: number;
  numberOfReviews: number;
  maxWidth?: number;
  maxHeight?: number;
}

export const TrustpilotHorizontal = ({
  trustScore,
  numberOfReviews,
  width,
  height,
  maxWidth = 128,
  maxHeight = 72,
}: TrustPilotHorizontalProps) => {
  return (
    <div
      className={cx(
        "flex items-center space-x-2 lg:space-x-4",
        { [`w-${maxWidth}`]: maxWidth },
        { [`h-${maxHeight}`]: maxHeight }
      )}
    >
      <div className="flex-shrink-0">
        <TrustpilotLogo width={width} height={height} />
      </div>
      <div className="flex-shrink-0">
        <TrustpilotStars
          trustScore={trustScore}
          width={width}
          height={height}
        />
      </div>
      <div
        className={cx(
          "whitespace-nowrap",
          "text-core-black",
          "font-garnett",
          "text-18px",
          "font-600",
          "leading-140"
        )}
      >
        Based on <strong>{numberOfReviews.toLocaleString()}</strong> reviews
      </div>
    </div>
  );
};
