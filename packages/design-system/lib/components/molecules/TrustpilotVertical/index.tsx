import { TrustpilotStars } from "@components/atoms/TrustPilotStars";
import { StorybookLogo } from "@components/atoms/StorybookLogo";
import cx from "classnames";

interface TrustPilotVerticalProps {
  trustPilotLogo: {
    altText: string;
    imgSrc: string;
  };
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
  trustPilotLogo,
}: TrustPilotVerticalProps) => {
  return (
    <div
      className={cx(
        "flex flex-col items-start space-y-4",
        { [`max-w-${maxWidth}`]: maxWidth },
        { [`max-h-${maxHeight}`]: maxHeight }
      )}
    >
      <StorybookLogo
        width={width}
        height={height}
        altText={trustPilotLogo.altText}
        imgSrc={trustPilotLogo.imgSrc}
        aria-label="Trustpilot logo"
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
