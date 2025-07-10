"use client";

import {
  ColorPill,
  SimpleNavBar,
  TipCard,
  TrustpilotHorizontal,
  useTrustpilotScore,
} from "@react-component-library/ui";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { ContactInfo } from "@/components/ContactInfo";
import { useAffiliateSession } from "@/hooks/useAffiliateSession";
import { getAssetPath } from "@/lib/get-asset-path";
import useJoinFlowStore from "@/store/useJoinFlowStore";

import { ChooseYourAddressText } from "./ChooseYourAddressProps";
import { ServiceAddressLookupForm } from "./forms/ServiceAddressLookupForm";

export const ChooseYourAddress = () => {
  const {
    pageTitle,
    openingHoursText,
    phoneNumber,
    nextStepPillText,
    navBarText,
  } = ChooseYourAddressText;
  const { data: trustpilotRating } = useTrustpilotScore();
  const { trustScore, numberOfReviews } = trustpilotRating || {};
  const { resetFlow, setRoiPostcode } = useJoinFlowStore();
  const postcodeParam = useSearchParams().get("postcode");

  useAffiliateSession();

  useEffect(() => {
    resetFlow();
    // Set postcode after reset if we have one from URL params
    if (postcodeParam) {
      setRoiPostcode(postcodeParam);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center">
      <SimpleNavBar backgroundColor="yellow">
        <div className="flex flex-col items-center gap-[2px] md:gap-2">
          <p className="text-xxs leading-[1.6] font-normal text-ui-grey-500">
            {navBarText}
          </p>
          <ColorPill
            colorPillText={nextStepPillText}
            backgroundColor="secondary-teal"
            size="extraSmall"
            className="px-4 md:w-[240px] justify-center"
          />
        </div>
      </SimpleNavBar>
      <div className="w-full sm:max-w-[570px] p-5 pt-20 flex flex-col items-center">
        <h1 className="mt-10 mb-4 text-md md:text-xl font-semibold">
          {pageTitle}
        </h1>
        <ServiceAddressLookupForm />
        <TipCard
          image={getAssetPath("/images/love.svg")}
          className="my-8 md:my-10 bg-ui-grey-100"
        >
          <ContactInfo
            phoneNumber={phoneNumber}
            openingHoursText={openingHoursText}
          />
        </TipCard>
        {trustScore && (
          <TrustpilotHorizontal
            trustScore={trustScore}
            numberOfReviews={numberOfReviews}
          />
        )}
      </div>
    </div>
  );
};
