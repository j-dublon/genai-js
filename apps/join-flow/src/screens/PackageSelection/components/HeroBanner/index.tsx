import { TrustpilotHorizontal } from "@react-component-library/ui";

import { getAssetPath } from "@/lib/get-asset-path";
import { Address } from "@/screens/PackageSelection/components/Address";

import { bannerTitle } from "./HeroBannerProps";

interface HeroBannerProps {
  trustScore?: number;
  numberOfReviews?: number;
}

export const HeroBanner = ({
  trustScore,
  numberOfReviews,
}: HeroBannerProps) => {
  return (
    <div className="bg-core-white flex relative flex-col items-center justify-center gap-4 md:gap-6 md:mx-auto px-5 md:px-0 py-10 md:pt-20 md:pb-10 z-0">
      <div
        className="hidden md:block absolute inset-0 -z-1 max-w-[1440px] mx-auto bg-no-repeat bg-right bg-contain"
        style={{
          backgroundImage: `url(${getAssetPath("/images/hero-background.png")})`,
        }}
        aria-hidden="true"
      />
      <div className="md:max-w-[805px]">
        <h1 className="text-[26px] md:text-5xl font-semibold leading-[1.2] text-center">
          {bannerTitle}
        </h1>
      </div>
      <div className="md:max-w-[805px] text-center pb-0 md:pb-6">
        <Address />
      </div>
      {trustScore && (
        <TrustpilotHorizontal
          trustScore={trustScore}
          numberOfReviews={numberOfReviews}
        />
      )}
    </div>
  );
};
