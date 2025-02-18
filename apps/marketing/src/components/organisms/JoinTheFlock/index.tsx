"use client";
import {
  PostcodeChecker,
  TextWithTickList,
  TrustpilotHorizontal,
} from "@react-component-library/ui";
import { ComponentProps } from "react";

interface JoinTheFlockProps {
  trustScore?: number;
  numberOfReviews?: number;
}

export const JoinTheFlock = ({
  trustScore,
  numberOfReviews,
}: JoinTheFlockProps) => {
  const TextItemList: ComponentProps<typeof TextWithTickList> = {
    TextWithTickList: [
      {
        textInput: "UK-based Customer Care team",
        backgroundColor: "yellow",
      },
      {
        textInput: "Ridiculously easy switching",
        backgroundColor: "yellow",
      },
      { textInput: "Free setup and installation", backgroundColor: "yellow" },
      {
        textInput: "Handy app to manage your account",
        backgroundColor: "yellow",
      },
    ],
  };

  return (
    <div className="relative z-10 order-none">
      <video
        data-test-id="join-the-flock-video"
        autoPlay
        playsInline
        loop
        muted
        className="absolute order-1 h-full w-full object-cover col-start-5 col-span-8 row-start-1 row-span-3 -z-10"
      >
        <source
          src="https://cuckoo-egg.cdn.prismic.io/cuckoo-egg/Z64a_JbqstJ9-lpY_Secondarysignup_motion_bg.mp4"
          type="video/mp4"
        />
      </video>
      <div className="z-20 flex flex-col items-center p-10 md:p-20 md:justify-between w-full md:gap-14 bg-cover bg-center md:py-40">
        <div className="flex flex-col md:flex-row rounded-[22px] bg-core-white w-full md:max-w-[1152px] h-fit md:col-start-1 md:col-span-6 md:row-start-2 px-10 py-16">
          <div className="flex-2 flex flex-col md:pr-10 min-w-0 pb-5">
            <h2 className="text-5xl font-bold pb-5">Join the flock today </h2>
            <p className="text-[26px] pb-10">
              Get full fibre speeds, actually amazing signal, plus aaall this
              too...
            </p>
            <div className="pb-10 lg:pr-20 min-w-[326px]">
              <PostcodeChecker
                placeholderText="Pop in your address"
                inputBoxButtonText="Let's go"
              />
            </div>
            {trustScore && numberOfReviews && (
              <TrustpilotHorizontal
                trustScore={trustScore}
                numberOfReviews={numberOfReviews}
              />
            )}
          </div>
          <div className="flex-2 flex flex-col gap-2 md:font-bold min-w-0">
            <TextWithTickList
              TextWithTickList={TextItemList.TextWithTickList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
