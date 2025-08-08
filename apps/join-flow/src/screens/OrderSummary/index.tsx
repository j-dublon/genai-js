"use client";

import {
  AccountAppButton,
  Button,
  SimpleNavBar,
  TextWithTickList,
  TextWithTickProps,
  TrustpilotStars,
  useTrustpilotScore,
} from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import Image from "next/image";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import { useEffect, useState } from "react";

import { getAssetPath } from "@/lib/get-asset-path";

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
    className: "text-sm mb-2",
  },
  {
    textInput: welcomeItems[1],
    padding: "none",
    className: "text-sm font-normal mb-2",
  },
  {
    textInput: welcomeItems[2],
    padding: "none",
    className: "text-sm font-normal mb-2",
  },
  {
    textInput: welcomeItems[3],
    padding: "none",
    className: "text-sm font-normal mb-6",
  },
];

interface TrustpilotCondensedProps {
  trustScore: number;
  numberOfReviews?: number;
}

const TrustpilotCondensed = ({
  trustScore,
  numberOfReviews,
}: TrustpilotCondensedProps): React.ReactNode => {
  return (
    <Link href="https://uk.trustpilot.com/review/cuckoo.co">
      <div className="flex flex-col max-w-[200px] mt-4">
        <div className="flex flex-col justify-start">
          <div>
            <Image
              width="75"
              height="25"
              src={getAssetPath("/images/trustpilot-logo.svg")}
              alt="trustpilot logo"
            />
          </div>
          <div>
            <TrustpilotStars trustScore={trustScore} />
          </div>
          {numberOfReviews && (
            <div className="text-[8px]">
              TrustScore{" "}
              <span className="font-semibold mr-[0.5]">{trustScore}</span> |{" "}
              <span className="font-semibold ml-[0.5]">
                {numberOfReviews?.toLocaleString()}
              </span>{" "}
              reviews
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export const OrderSummary = () => {
  const { data: trustpilotRating } = useTrustpilotScore();
  const { trustScore, numberOfReviews } = trustpilotRating || {};
  const posthog = usePostHog();
  const { personalDetails, resetAffiliateSession, resetFlow } =
    useJoinFlowStore();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    if (personalDetails && personalDetails.firstName) {
      setFirstName(personalDetails.firstName);
    }

    posthog.capture("join_flow_reset_basket");
    resetAffiliateSession();
    resetFlow();
  }, [personalDetails, posthog, resetAffiliateSession, resetFlow]);

  return (
    <>
      <SimpleNavBar backgroundColor="yellow" noBorder={true} fixed={true} />
      <div className="bg-core-yellow min-h-screen bg-[url(/vc-ap-join-flow/assets/images/confirmation.svg)] bg-cover pt-10">
        <div className="flex flex-col items-center mx-auto min-w-full">
          <div className="flex flex-row justify-evenly bg-core-white rounded-lg max-w-[958px] px-24 pt-8 gap-24 mb-10 mt-90">
            <div className="max-h-[380px] min-w-[260px] overflow-hidden">
              <img
                src={getAssetPath("/images/myaccount-phone.svg")}
                alt="phone account screen"
                width="318px"
                height="478px"
              />
            </div>

            <div>
              <div className="mb-6">
                <h1 className="text-4xl font-semibold text-core-black">
                  {welcomeHeading}
                  {firstName && ` ${firstName}`}!
                </h1>
                <span>{welcomeText}</span>
              </div>

              <div>
                <TextWithTickList textItems={textItems} />
                <AccountAppButton />
              </div>
            </div>
          </div>

          <div className="bg-core-white rounded-lg max-w-[958px] min-h-[300px] px-24 pt-8 pb-8 mb-8 gap-2">
            <div className="flex flex-row justify-evenly gap-24">
              <div className="py-8 px-0 max-w-[300px]">
                <div className="text-lg font-semibold text-core-black mb-2">
                  {myAccountHeading}
                </div>
                <p className="mb-4">{myAccountText}</p>
                <Button
                  tint="yellow"
                  variant="solid"
                  type="button"
                  size="medium"
                  href="/account/login"
                >
                  <span className="text-sm">{myAccountBtnText}</span>
                </Button>
              </div>
              <div className="bg-core-grey-200 rounded-lg py-8 px-12 min-w-[300px]">
                <div className="text-xl font-semibold text-core-black mb-4">
                  {reviewHeading}
                </div>
                <Button
                  tint="black"
                  variant="solid"
                  type="button"
                  size="medium"
                  href="https://uk.trustpilot.com/review/cuckoo.co"
                >
                  <span className="text-sm">{reviewBtnText}</span>
                </Button>

                {trustScore && (
                  <TrustpilotCondensed
                    trustScore={trustScore}
                    numberOfReviews={numberOfReviews}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
