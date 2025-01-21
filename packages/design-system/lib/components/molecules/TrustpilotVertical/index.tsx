import React from "react";
import { getTrustpilotStarRating } from "../../../utils/getTrustpilotStarRating";

interface Props {
  trustScore: number;
  numberOfReviews: number;
}

export const TrustpilotVertical: React.FC<Props> = ({
  trustScore,
  numberOfReviews,
}) => {
  const imageName: string = getTrustpilotStarRating(trustScore);

  const imageURI = "/images/newBrand/trustpilot/" + imageName;

  return (
    <div className="flex grid">
      <div className="col-start-2 w-full max-w-[11.5rem] lg:max-w-[14.75rem]">
        <img
          width={144}
          height={36}
          src="/images/newBrand/trustpilot/logo.svg"
          alt="trustpilot logo"
          className="h-[1rm]"
        />
        <div className="container mx-auto pt-2">
          <img width={230} height={43} src={imageURI} alt="trustpilot stars" />
        </div>
        <div className="text-hummingbird mt-2 whitespace-nowrap text-[8px] lg:text-xs">
          Trust Score <strong>{trustScore}</strong> &nbsp; | &nbsp;{" "}
          <strong>{numberOfReviews.toLocaleString()}</strong> reviews
        </div>
      </div>
    </div>
  );
};

TrustpilotVertical.displayName = "TrustpilotVertical";
