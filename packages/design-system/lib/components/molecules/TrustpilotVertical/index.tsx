import { TrustpilotStars } from "./TrustPilotStars";
import { StorybookLogo } from "@components/atoms/StorybookLogo";

interface Props {
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

export const TrustpilotVertical: React.FC<Props> = ({
  trustScore,
  width,
  height,
  maxWidth = 128,
  maxHeight = 72,
  trustPilotLogo,
}) => {
  return (
    <div
      className="flex flex-col items-start space-y-4"
      style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }}
      aria-label="Trustpilot vertical section"
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

TrustpilotVertical.displayName = "TrustpilotVertical";
