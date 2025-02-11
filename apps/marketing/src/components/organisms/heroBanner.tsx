"use client";
import {
  Heading,
  TextWithTick,
  PostcodeChecker,
  TrustpilotHorizontal,
} from "@react-component-library/ui";

interface HeroBannerProps {
  trustScore?: number;
  numberOfReviews?: number;
  broadbandOffer?: boolean;
}

export const HeroBanner = ({
  trustScore,
  numberOfReviews = 0,
  broadbandOffer,
}: HeroBannerProps) => {
  return (
    <div
      className="flex justify-center"
      style={{ backgroundImage: "url('/assets/images/cuckoo_background.png')" }}
      data-testid="hero-banner"
    >
      <div className="flex md:flex-row flex-col md:py-20 p-5 md:justify-end items-center max-w-[1152px] md:gap-[64px]">
        <div className="flex-1 flex flex-col md:pr-10">
          <Heading headingText="Ridiculously fast full fibre broadband" />
          <p className="pb-5 font-garnett text-[26px] font-normal leading-[1.5]">
            Stream, game and WFH, all at the same time, with no drop-offs.
          </p>
          <form>
            <PostcodeChecker
              placeholderText="Pop in your address"
              inputBoxButtonText="Let's go"
            />
          </form>
          {trustScore !== undefined && (
            <TrustpilotHorizontal
              trustScore={trustScore}
              width={100}
              height={100}
              numberOfReviews={numberOfReviews}
            />
          )}
        </div>
        <div className="flex w-[85%] h-[85%]">
          <div className="flex-1 flex flex-col gap-2 font-bold justify-start">
            {/* This will be updated to use data from the CMS */}
            {broadbandOffer && (
              <TextWithTick
                textInput="Lorem ipsum dolor sit"
                ariaLabel="Lorem ipsum dolor sit"
                broadbandOffer={broadbandOffer}
              />
            )}

            <TextWithTick
              textInput="Full fibre speeds up to 900Mbps"
              ariaLabel="Full fibre speeds up to 900Mbps"
            />

            <TextWithTick
              textInput="UK’s most reliable broadband technology"
              ariaLabel="UK’s most reliable broadband technology"
            />
            <TextWithTick
              textInput="Free* eero Pro 6E router, worth £249.99** "
              ariaLabel="Free* eero Pro 6E router, worth £249.99** "
            />
            <TextWithTick
              textInput="Fair and transparent prices"
              ariaLabel="Fair and transparent prices"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
