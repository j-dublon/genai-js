"use client";

import {
  Button,
  SimpleNavBar,
  TrustpilotHorizontal,
  useTrustpilotScore,
} from "@react-component-library/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const text = {
    "not-shown": NotShownText,
    "cannot-service-address": CannotServiceAddressText,
    unavailable: UnavailableText,
  }[source];

  const {
    buttonText,
    tooltipText,
    tooltipContent,
    privacyNoticeText,
    privacyNoticeLinkText,
    privacyNoticeUrl,
    errorTipCardTitle,
    formErrorText,
    formTitle,
    formDescription,
    submittedPageTitle,
    submittedDescription,
    submittedButtonText,
    submittedButtonUrl,
  } = text;

  const { data: trustpilotRating } = useTrustpilotScore();
  const { trustScore, numberOfReviews } = trustpilotRating || {};

  const pageTitle = hasSubmitted ? submittedPageTitle : formTitle;

  const description = hasSubmitted ? (
    <>
      {submittedDescription.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </>
  ) : (
    formDescription
  );

  return (
    <>
      <SimpleNavBar backgroundColor="yellow" fixed={false} />
      <div className="px-5 pb-8 pt-8 lg:pt-16 mx-auto">
        <div
          data-testid={`${source}-roi`}
          className="relative w-full lg:max-w-[1152px] mx-auto mt-4 lg:mt-4 mb-10 lg:mb-20 rounded-md bg-ui-grey-100 overflow-hidden"
        >
          <div className="relative flex flex-col w-full md:w-2/3 py-8 md:py-24 px-5 md:px-24 z-1">
            <h2 className="text-3xl md:text-5xl font-semibold text-core-black mb-6 leading-[1.4]">
              {pageTitle}
            </h2>
            <div className="mb-8">
              <p className="text-sm md:text-md text-core-black flex flex-col gap-6">
                {description}
              </p>
            </div>
            {hasSubmitted ? (
              <Button
                onClick={() => router.push(submittedButtonUrl)}
                type="button"
                variant="solid"
                tint="yellow"
                size="large"
                fullWidth
              >
                {submittedButtonText}
              </Button>
            ) : (
              <>
                <RegisterOfInterestForm
                  source={source}
                  buttonText={buttonText}
                  privacyNoticeText={privacyNoticeText}
                  privacyNoticeLinkText={privacyNoticeLinkText}
                  privacyNoticeUrl={privacyNoticeUrl}
                  errorTipCardTitle={errorTipCardTitle}
                  formErrorText={formErrorText}
                  onSuccess={() => setHasSubmitted(true)}
                />
                <ToolTipOrModal
                  tooltipText={tooltipText}
                  tooltipContent={tooltipContent}
                />
              </>
            )}
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
