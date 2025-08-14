"use client";

import {
  AccountAppButton,
  Button,
  MobilePhone,
  SimpleNavBar,
  TextWithTickList,
  TextWithTickProps,
  TrustpilotHorizontal,
  useTrustpilotScore,
} from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useEffect, useState } from "react";

import { orderSummaryProps } from "./orderSummaryProps";

const {
  welcomeHeading,
  welcomeText,
  welcomeItems,
  myAccountHeading,
  myAccountText,
  myAccountBtnText,
  reviewHeading,
  reviewBtnText,
} = orderSummaryProps;

export const textItems: TextWithTickProps[] = [
  {
    textInput: welcomeItems[0],
    padding: "none",
    className: "text-sm mb-2 md:mb-[18px]",
  },
  {
    textInput: welcomeItems[1],
    padding: "none",
    className: "text-sm font-normal mb-2 md:mb-[18px]",
  },
  {
    textInput: welcomeItems[2],
    padding: "none",
    className: "text-sm font-normal mb-2 md:mb-[18px]",
  },
  {
    textInput: welcomeItems[3],
    padding: "none",
    className: "text-sm font-normal mb-8 md:mb-[30px]",
  },
];

type TopCardProps = {
  firstName: string;
  selectedTextIndex: number;
};

const TopCardDesktop = ({ firstName, selectedTextIndex }: TopCardProps) => (
  <div className="hidden md:flex flex-row bg-core-white rounded-md p-6 md:pt-[60px] mb-10 mt-14 overflow-hidden w-full max-w-md md:max-w-[958px]">
    <MobilePhone
      selectedTextIndex={selectedTextIndex}
      className="m-auto -mt-[80px] mb-6 md:-mb-6 lg:-mb-32 md:ml-[74px] md:mr-[82px]"
    />
    <div className="flex flex-col">
      <div className="mb-6 md:mb-8 md:mt-3">
        <h1 className="text-3xl font-semibold text-core-black mb-2">{`${welcomeHeading}${firstName ? " " + firstName : ""}!`}</h1>
        <p className="text-sm md:text-md">{welcomeText}</p>
      </div>
      <TextWithTickList textItems={textItems} />
      <AccountAppButton />
    </div>
  </div>
);

const TopCardMobile = ({ firstName, selectedTextIndex }: TopCardProps) => (
  <div className="flex md:hidden flex-col bg-core-white rounded-md p-6 mb-10 mt-14 overflow-hidden w-full max-w-md md:max-w-[958px]">
    <div className="mb-6">
      <h1 className="text-md font-semibold text-core-black mb-2">{`${welcomeHeading}${firstName ? " " + firstName : ""}!`}</h1>
      <p>{welcomeText}</p>
    </div>
    <MobilePhone
      selectedTextIndex={selectedTextIndex}
      className="m-auto -mt-[80px] mb-6"
    />
    <TextWithTickList textItems={textItems} />
    <AccountAppButton />
  </div>
);

export const OrderSummary = () => {
  const { data: trustpilotRating } = useTrustpilotScore();
  const { trustScore, numberOfReviews } = trustpilotRating || {};
  const { personalDetails, resetAffiliateSession, resetFlow } =
    useJoinFlowStore();
  const [firstName, setFirstName] = useState("");
  const [animationScreenIndex, setAnimationScreenIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationScreenIndex((prevText) =>
        prevText !== null ? (prevText + 1) % 4 : 0,
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (personalDetails && personalDetails.firstName) {
      setFirstName(personalDetails.firstName);
    }

    resetAffiliateSession();
    resetFlow();
  }, [personalDetails, resetAffiliateSession, resetFlow]);

  return (
    <>
      <SimpleNavBar backgroundColor="yellow" noBorder={true} fixed={true} />
      <div className="bg-core-yellow min-h-screen bg-[url(/vc-ap-join-flow/assets/images/confirmation-bg-mobile.svg)] md:bg-[url(/vc-ap-join-flow/assets/images/confirmation-bg.svg)] bg-cover bg-no-repeat pb-10">
        <img
          src="/vc-ap-join-flow/assets/images/woohoo.svg"
          className="w-full h-auto"
          alt="Woohoo graphic"
        />
        <div className="flex flex-col items-center px-6">
          <TopCardDesktop
            firstName={firstName}
            selectedTextIndex={animationScreenIndex}
          />
          <TopCardMobile
            firstName={firstName}
            selectedTextIndex={animationScreenIndex}
          />

          <div className="flex flex-col md:items-center bg-core-white rounded-md p-6 md:px-6 md:py-16 max-w-md md:max-w-[958px] md:w-[958px]">
            <div className="mb-6 md:max-w-[632px] md:m-auto">
              <h1 className="text-md md:text-3xl md:text-center font-semibold text-core-black mb-2">
                {myAccountHeading}
              </h1>
              <p className="md:text-md md:text-center">{myAccountText}</p>
            </div>
            <div className="md:w-[555px] md:mt-12">
              <Button
                tint="yellow"
                variant="solid"
                type="button"
                href="/account/login"
                className="md:w-[555px] md:mb-12"
              >
                <span className="text-xs md:text-md">{myAccountBtnText}</span>
              </Button>

              <div className="bg-core-grey-200 rounded-md mt-8 p-6 md:p-10 md:max-w-[632px] md:m-auto">
                <div className="text-sm md:text-md font-semibold text-core-black mb-6">
                  {reviewHeading}
                </div>
                <Button
                  tint="black"
                  variant="solid"
                  type="button"
                  href="https://uk.trustpilot.com/review/cuckoo.co"
                >
                  <span className="text-xs md:text-sm">{reviewBtnText}</span>
                </Button>
              </div>
            </div>
          </div>
          {trustScore && (
            <div className="mt-6 md:mt-10">
              <TrustpilotHorizontal
                trustScore={trustScore}
                numberOfReviews={numberOfReviews}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
