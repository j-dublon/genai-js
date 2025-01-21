import React from "react";
import { TrustpilotLogo } from "@components/molecules/TrustpilotVertical/TrustpilotLogo";
import { TrustpilotStars } from "@components/molecules/TrustpilotVertical/TrustpilotStars";

interface Props {
  trustScore: number;
  numberOfReviews: number;
}

export const TrustpilotVertical: React.FC<Props> = ({
  trustScore,
  numberOfReviews,
}) => {
  return (
    <div className="flex grid">
      <TrustpilotLogo width={144} height={36} />
      <div className="w-auto max-w-none">
        <TrustpilotStars trustScore={5} />
        <div className="text-hummingbird mt-2 whitespace-nowrap text-[8px] lg:text-xs">
          Trust Score <strong>{trustScore}</strong> &nbsp; | &nbsp;{" "}
          <strong>{numberOfReviews.toLocaleString()}</strong> reviews
        </div>
      </div>
    </div>
  );
};

TrustpilotVertical.displayName = "TrustpilotVertical";
