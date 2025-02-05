import { TrustpilotStars } from "@components/atoms/TrustPilotStars";
import cx from "classnames";
import { TrustPilotLogo } from "@icons/TrustPilotLogo";

interface TrustPilotVerticalProps {
  trustPilotAriaLabel?: string;
  width: number;
  height: number;
  trustScore: number;
  maxWidth?: number;
  maxHeight?: number;
}

export const TrustpilotVertical = ({
  trustScore,
  width,
  height,
  maxWidth = 128,
  maxHeight = 72,
  trustPilotAriaLabel,
}: TrustPilotVerticalProps) => {
  return (
    <div
      className={cx(
        "flex flex-col items-start space-y-4",
        { [`max-w-${maxWidth}`]: maxWidth },
        { [`max-h-${maxHeight}`]: maxHeight }
      )}
    >
      <TrustPilotLogo
        width={width}
        height={height}
        aria-label={trustPilotAriaLabel}
      />
      <TrustpilotStars
        trustScore={trustScore}
        width={width}
        height={height}
        aria-label={`Trustpilot stars with score of ${trustScore}`}
      />
    </div>
  );
};
