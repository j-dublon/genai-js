"use client";
import {
  Heading,
  PostcodeChecker,
  TextWithTickList,
  TrustpilotHorizontal,
} from "@react-component-library/ui";
import { usePostHog } from "posthog-js/react";

import { usePostcode } from "@/hooks";

import { textItems } from "./heroBannerProps";

interface HeroBannerProps {
  trustScore?: number;
  numberOfReviews?: number;
  broadbandOffer?: boolean;
  enableTermsAndConditionsText?: boolean;
  termsAndConditionsText?: string;
}

export const HeroBanner = ({
  trustScore,
  numberOfReviews = 0,
  enableTermsAndConditionsText,
  termsAndConditionsText = "",
}: HeroBannerProps) => {
  const { handleFormSubmit, postcode, setPostcode } = usePostcode();
  const posthog = usePostHog();

  const onClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    posthog?.capture("user_clicked_check_postcode_button");
    handleFormSubmit(event);
  };

  return (
    <div
      className="relative flex justify-center bg-core-yellow z-0"
      data-testid="hero-banner"
    >
      <video
        data-testid="hero-banner-video"
        autoPlay
        playsInline
        loop
        muted
        className="absolute order-1 h-full w-full object-cover col-start-5 col-span-8 row-start-1 row-span-3 z-1"
      >
        <source
          src="https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/Z9vpgDiBA97Gisse_0325_MarketingWebsite_Homepage_3DWorld_Animation.mp4"
          type="video/mp4"
        />
      </video>
      <div className="flex flex-col px-mobile sm:px-tablet lg:px-desktop z-10">
        <div className="flex md:flex-row flex-col py-9 md:pb-35 md:pt-[90px] md:items-start items-center max-w-[1152px]">
          <div className="flex-1 flex flex-col pb-12 md:pb-0 md:pr-10">
            <Heading headingText="Ridiculously fast full fibre broadband" />
            <p className="text-md md:text-[26px] md:pb-7 pb-6 font-garnett font-normal leading-[1.5]">
              For all the streaming, gaming and WFHing you can possibly throw at
              it.
            </p>
            <div className="md:pb-16">
              <PostcodeChecker
                placeholderText="Pop in your postcode"
                inputBoxButtonText="Let's go"
                postcode={postcode}
                setPostcode={setPostcode}
                onClickFunction={onClick}
              />
            </div>
            <div
              className="md:block hidden"
              data-testid="trustpilot-horizontal-component-desktop"
            >
              {trustScore !== undefined && (
                <TrustpilotHorizontal
                  trustScore={trustScore}
                  numberOfReviews={numberOfReviews}
                />
              )}
            </div>
          </div>
          <div className="flex md:w-[85%] w-full h-[85%]">
            <div className="flex-1 flex flex-col gap-3 font-medium justify-start md:pb-0 pb-12">
              <TextWithTickList textItems={textItems} />
            </div>
          </div>
          <div
            className="md:hidden"
            data-testid="trustpilot-horizontal-component-mobile"
          >
            {trustScore !== undefined && (
              <TrustpilotHorizontal
                trustScore={trustScore}
                numberOfReviews={numberOfReviews}
              />
            )}
          </div>
        </div>
        {enableTermsAndConditionsText && (
          <div className="px-5 py-1.75 text-xs font-normal md:block hidden">
            {termsAndConditionsText}
          </div>
        )}
      </div>
    </div>
  );
};
