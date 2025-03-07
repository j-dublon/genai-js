import { TrustpilotStars } from "@components/atoms/TrustpilotStars";
import { TrustpilotLogo } from "@icons/TrustpilotLogo";
import cx from "classnames";
import Link from "next/link";

interface TrustpilotVerticalProps {
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
}: TrustpilotVerticalProps) => {
  return (
    <Link href="https://uk.trustpilot.com/review/cuckoo.co">
      <div
        className={cx(
          "ds:flex ds:flex-col ds:items-start",
          { [`ds:max-w-${maxWidth}`]: maxWidth },
          { [`ds:max-h-${maxHeight}`]: maxHeight },
        )}
      >
        <TrustpilotLogo width={width} height={height} />
        <TrustpilotStars trustScore={trustScore} width={width} height={20} />
      </div>
    </Link>
  );
};
