import { TrustpilotStars } from "@components/atoms/TrustPilotStars";
import { StorybookLogo } from "@components/atoms/StorybookLogo";

interface TrustPilotHorizontalProps {
  trustPilotLogo: {
    altText: string;
    imgSrc: string;
  };
  width: number;
  height: number;
  trustScore: number;
  numberOfReviews: number;
  maxWidth?: number;
  maxHeight?: number;
}

export const TrustpilotHorizontal: React.FC<TrustPilotHorizontalProps> = ({
  trustScore,
  numberOfReviews,
  width,
  height,
  maxWidth = 128,
  maxHeight = 72,
  trustPilotLogo,
}) => {
  return (
    <div
      className="flex items-center justify-between"
      style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }}
    >
      <StorybookLogo
        width={width}
        height={height}
        altText={trustPilotLogo.altText}
        imgSrc={trustPilotLogo.imgSrc}
        aria-label="Trustpilot logo"
        className="mr-2 h-8 lg:mr-4 lg:h-8"
      />
      <TrustpilotStars
        trustScore={trustScore}
        width={width}
        height={height}
        aria-label={`Trustpilot stars with score of ${trustScore}`}
      />
      <div className="text-hummingbird whitespace-nowrap sm:text-robin md:text-blackbird">
        Based on <strong>{numberOfReviews.toLocaleString()}</strong> reviews
      </div>
    </div>
  );
};
