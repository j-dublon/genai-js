"use client";
import {
  PostcodeChecker,
  TextWithTickList,
  TrustpilotHorizontal,
} from "@react-component-library/ui";
import { usePostHog } from "posthog-js/react";
import { ComponentProps } from "react";

import { usePostcode } from "@/hooks";

interface JoinTheFlockProps {
  trustScore?: number;
  numberOfReviews?: number;
}

export const JoinTheFlock = ({
  trustScore,
  numberOfReviews,
}: JoinTheFlockProps) => {
  const { handleFormSubmit, postcode, setPostcode } = usePostcode();
  const posthog = usePostHog();
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

  const onClick = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    posthog?.capture("user_clicked_check_postcode_button");
    handleFormSubmit(event);
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
      <div className="z-20 flex flex-col items-center px-mobile sm:px-tablet lg:px-desktop py-5 md:py-40 md:justify-between w-full">
        <div className="flex flex-col md:flex-row rounded-[22px] bg-core-white w-full md:max-w-[1152px] h-fit md:col-start-1 md:col-span-6 md:row-start-2 px-5 md:px-10 md:py-16 py-6">
          <div className="flex-2 flex flex-col md:pr-10 min-w-0 pb-5 md:pb-0">
            <h2 className="md:text-5xl text-4xl font-bold pb-5">
              Join the flock today{" "}
            </h2>
            <p className="md:text-[26px] text-[16px] md:pb-10 pb-6">
              Get full fibre speeds, actually amazing signal, plus aaall this
              too...
            </p>
            <div className="pb-10 lg:pr-20 ">
              <PostcodeChecker
                placeholderText="Pop in your postcode"
                inputBoxButtonText="Let's go"
                postcode={postcode}
                setPostcode={setPostcode}
                onClickFunction={onClick}
              />
            </div>
            <div className="md:block hidden">
              {trustScore && numberOfReviews && (
                <TrustpilotHorizontal
                  trustScore={trustScore}
                  numberOfReviews={numberOfReviews}
                />
              )}
            </div>
          </div>
          <div className="flex-2 flex flex-col gap-2 font-medium min-w-0 pb-12 md:pb-0">
            <TextWithTickList
              TextWithTickList={TextItemList.TextWithTickList}
            />
          </div>
          <div className="md:hidden">
            {trustScore && numberOfReviews && (
              <TrustpilotHorizontal
                trustScore={trustScore}
                numberOfReviews={numberOfReviews}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
