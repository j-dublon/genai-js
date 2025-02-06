import { TrustpilotStars } from "@components/atoms/TrustpilotStars";
import cx from "classnames";
import { TrustpilotLogo } from "@icons/TrustpilotLogo";

interface TrustPilotVerticalProps {
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
}: TrustPilotVerticalProps) => {
  return (
    <div
      className={cx(
        "flex flex-col items-start",
        { [`max-w-${maxWidth}`]: maxWidth },
        { [`max-h-${maxHeight}`]: maxHeight }
      )}
    >
      <TrustpilotLogo width={width} height={height} />
      <TrustpilotStars trustScore={trustScore} width={width} height={20} />
    </div>
  );
};
