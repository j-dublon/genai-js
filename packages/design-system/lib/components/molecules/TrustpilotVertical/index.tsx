import React from "react";
import { TrustpilotLogo } from "@components/molecules/TrustpilotVertical/TrustpilotLogo";
import { TrustpilotStars } from "@components/molecules/TrustpilotVertical/TrustpilotStars";

interface Props {
  trustScore: number;
  maxWidth?: number;
  maxHeight?: number;
}

export const TrustpilotVertical: React.FC<Props> = ({
  trustScore,
  maxWidth = 128,
  maxHeight = 72,
}) => {
  return (
    <div
      className="flex flex-col items-start space-y-4"
      style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }}
    >
      <TrustpilotLogo />
      <TrustpilotStars trustScore={trustScore} width={144} height={36} />
    </div>
  );
};

TrustpilotVertical.displayName = "TrustpilotVertical";
