"use client";
import {
  Heading,
  PostcodeChecker,
  TextWithTickList,
  TrustpilotHorizontal,
} from "@react-component-library/ui";
import { ComponentProps } from "react";

interface HeroBannerProps {
  trustScore?: number;
  numberOfReviews?: number;
  broadbandOffer?: boolean;
}

export const HeroBanner = ({
  trustScore,
  numberOfReviews = 0,
}: HeroBannerProps) => {
  const TextItemList: ComponentProps<typeof TextWithTickList> = {
    TextWithTickList: [
      { textInput: "Lorem ipsum dolor sit", broadbandOffer: true },
      { textInput: "Full fibre speeds up to 900Mbps" },
      { textInput: "UK’s most reliable broadband technology" },
      { textInput: "Free* eero Pro 6E router, worth £249.99**" },
    ],
  };
  return (
    <div
      className="flex justify-center"
      style={{ backgroundImage: "url('/assets/images/cuckoo_background.png')" }}
      data-testid="hero-banner"
    >
      <div className="flex md:flex-row flex-col p-5 md:justify-end items-center max-w-[1152px] md:gap-[64px]">
        <div className="flex-1 flex flex-col md:pr-10">
          <Heading headingText="Ridiculously fast full fibre broadband" />
          <p className="pb-5 font-garnett text-[26px] font-normal leading-[1.5]">
            Stream, game and WFH, all at the same time, with no drop-offs.
          </p>
          <PostcodeChecker
            placeholderText="Pop in your address"
            inputBoxButtonText="Let's go"
          />
          {trustScore !== undefined && (
            <TrustpilotHorizontal
              trustScore={trustScore}
              numberOfReviews={numberOfReviews}
            />
          )}
        </div>
        <div className="flex w-[85%] h-[85%]">
          <div className="flex-1 flex flex-col gap-2 font-bold justify-start">
            <TextWithTickList
              TextWithTickList={TextItemList.TextWithTickList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
