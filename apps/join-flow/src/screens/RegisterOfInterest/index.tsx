"use client";

import {
  SimpleNavBar,
  TrustpilotHorizontal,
  useTrustpilotScore,
} from "@react-component-library/ui";

import { getAssetPath } from "@/lib/get-asset-path";

import { RegisterOfInterestForm } from "./components/RegisterOfInterestForm";
import { ToolTipOrModal } from "./components/ToolTipOrModal";
import {
  CannotServiceAddressText,
  NotShownText,
  UnavailableText,
} from "./RegisterOfInterestProps";

export const RegisterOfInterest = ({
  source,
}: {
  source: "not-shown" | "cannot-service-address" | "unavailable";
}) => {
  const text = {
    "not-shown": NotShownText,
    "cannot-service-address": CannotServiceAddressText,
    unavailable: UnavailableText,
  }[source];

  const {
    pageTitle,
    description,
    buttonText,
    tooltipText,
    tooltipContent,
    privacyNoticeText,
    privacyNoticeLinkText,
    privacyNoticeUrl,
    errorTipCardTitle,
  } = text;

  const { data: trustpilotRating } = useTrustpilotScore();
  const { trustScore, numberOfReviews } = trustpilotRating || {};

  return (
    <>
      <SimpleNavBar backgroundColor="yellow" fixed={false} />
      <div className="px-5 pb-8 pt-8 lg:pt-16 mx-auto">
        <div
          data-testid={`${source}-roi`}
          className="relative w-full lg:max-w-[1152px] mx-auto mt-4 lg:mt-4 mb-10 lg:mb-20 rounded-md bg-ui-grey-100 overflow-hidden"
        >
          <div className="relative flex flex-col w-full md:w-2/3 py-12 md:py-24 px-5 md:px-20 z-1">
            <h2 className="text-3xl md:text-5xl font-semibold text-core-black mb-6 leading-[1.4]">
              {pageTitle}
            </h2>

            <div className="mb-8">
              <p className="text-sm md:text-md text-core-black">
                {description}
              </p>
            </div>

            <RegisterOfInterestForm
              source={source}
              buttonText={buttonText}
              privacyNoticeText={privacyNoticeText}
              privacyNoticeLinkText={privacyNoticeLinkText}
              privacyNoticeUrl={privacyNoticeUrl}
              errorTipCardTitle={errorTipCardTitle}
            />
            <ToolTipOrModal
              tooltipText={tooltipText}
              tooltipContent={tooltipContent}
            />
          </div>

          <div className="hidden md:block absolute -top-40 -right-90 pointer-events-none">
            <img
              src={getAssetPath("/images/3D_Flex.svg")}
              alt=""
              width="auto"
              height="auto"
              aria-hidden="true"
              className="w-full h-[900px]"
            />
          </div>
        </div>
      </div>

      {trustScore && (
        <div className="flex justify-center mb-10 lg:mb-20">
          <TrustpilotHorizontal
            trustScore={trustScore}
            numberOfReviews={numberOfReviews}
            flexDirectionMobile="col"
          />
        </div>
      )}
    </>
  );
};
