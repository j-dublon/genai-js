"use client";

import {
  ColorPill,
  SimpleNavBar,
  TipCard,
  TrustpilotHorizontal,
  useTrustpilotScore,
} from "@react-component-library/ui";

import { ContactInfo } from "@/components/ContactInfo";
import { useAffiliateSession } from "@/hooks/useAffiliateSession";
import { getAssetPath } from "@/lib/get-asset-path";

import { ChooseYourAddressText } from "./ChooseYourAddressProps";
import { AddressLookupForm } from "./forms/AddressLookupForm";

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

  useAffiliateSession();

  return (
    <div className="flex flex-col items-center">
      <SimpleNavBar>
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
      <div className="w-full sm:max-w-[570px] p-5 flex flex-col items-center">
        <h1 className="mt-10 mb-4 text-md md:text-xl font-semibold">
          {pageTitle}
        </h1>
        <AddressLookupForm />
        <TipCard
          image={{
            src: getAssetPath("/images/love.svg"),
            alt: "Love heart speech bubble",
          }}
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
