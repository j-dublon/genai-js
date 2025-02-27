"use client";
import {
  Heading,
  PostcodeChecker,
  TextWithTickList,
  TrustpilotHorizontal,
} from "@react-component-library/ui";
import { usePostHog } from "posthog-js/react";
import { ComponentProps } from "react";

import { usePostcode } from "@/hooks/usePostcode";

interface HeroBannerProps {
  trustScore?: number;
  numberOfReviews?: number;
  broadbandOffer?: boolean;
}

export const HeroBanner = ({
  trustScore,
  numberOfReviews = 0,
}: HeroBannerProps) => {
  const { handleFormSubmit, postcode, setPostcode } = usePostcode();
  const posthog = usePostHog();
  const TextItemList: ComponentProps<typeof TextWithTickList> = {
    TextWithTickList: [
      { textInput: "Lorem ipsum dolor sit", broadbandOffer: true },
      { textInput: "Full fibre speeds up to 900Mbps" },
      { textInput: "UK’s most reliable broadband technology" },
      { textInput: "Free* eero Pro 6E router, worth £249.99**" },
    ],
  };

  const enableTermsAndConditionsText =
    process.env.NEXT_PUBLIC_ENABLE_TERMS_AND_CONDITIONS;

  const termsAndConditionsText =
    "*Lorem ipsum dolor sit amet consectetur. Diam ullamcorper felis at vel amet nunc sed phasellus. Odio rhoncus.";

  // TODO: This is just an example replace when actual button logic is added
  const onClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    posthog?.capture("user_clicked_check_postcode_button");
    handleFormSubmit(event);
  };

  return (
    <div className="flex justify-center" data-testid="hero-banner">
      <video
        data-test-id="hero-banner-video"
        autoPlay
        playsInline
        loop
        muted
        className="absolute order-1 h-full w-full object-cover col-start-5 col-span-8 row-start-1 row-span-3 -z-10"
      >
        <source
          src="https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/Z7SYdZ7c43Q3f64O_Hero_motion_banner.mp4"
          type="video/mp4"
        />
      </video>
      <div className="flex flex-col">
        <div className="flex md:flex-row flex-col p-5 pb-10 md:pt-20 md:justify-end items-center max-w-[1152px] md:gap-[64px]">
          <div className="flex-1 flex flex-col md:pr-10 pb-10 md:pb-36">
            <Heading headingText="Ridiculously fast full fibre broadband" />
            <p className="pb-5 font-garnett text-[26px] font-normal leading-[1.5]">
              Stream, game and WFH, all at the same time, with no drop-offs.
            </p>
            <div className="pb-16">
              <PostcodeChecker
                placeholderText="Pop in your address"
                inputBoxButtonText="Let's go"
                postcode={postcode}
                setPostcode={setPostcode}
                onClickFunction={onClick}
              />
            </div>
            {trustScore !== undefined && (
              <TrustpilotHorizontal
                trustScore={trustScore}
                numberOfReviews={numberOfReviews}
              />
            )}
          </div>
          <div className="flex md:w-[85%] w-full h-[85%]">
            <div className="flex-1 flex flex-col gap-2 font-bold justify-start">
              <TextWithTickList
                TextWithTickList={TextItemList.TextWithTickList}
              />
            </div>
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
