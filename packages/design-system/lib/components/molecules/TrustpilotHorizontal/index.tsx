import { TrustpilotStars } from "@components/atoms/TrustPilotStars";
import { StorybookLogo } from "@components/atoms/StorybookLogo";
import cx from "classnames";

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

export const TrustpilotHorizontal = ({
  trustScore,
  numberOfReviews,
  width,
  height,
  maxWidth = 128,
  maxHeight = 72,
  trustPilotLogo,
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
        <StorybookLogo
          width={width}
          height={height}
          altText={trustPilotLogo.altText}
          imgSrc={trustPilotLogo.imgSrc}
          aria-label="Trustpilot logo"
        />
      </div>
      <div className="flex-shrink-0">
        <TrustpilotStars
          trustScore={trustScore}
          width={width}
          height={height}
        />
      </div>
      <div className="text-hummingbird whitespace-nowrap sm:text-robin md:text-blackbird">
        Based on{" "}
        <span className="font-bold">{numberOfReviews.toLocaleString()}</span>{" "}
        reviews
      </div>
    </div>
  );
};
