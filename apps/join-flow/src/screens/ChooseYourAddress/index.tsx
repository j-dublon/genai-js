"use client";

import {
  ColorPill,
  LoadingModal,
  SimpleNavBar,
  TipCard,
  TrustpilotHorizontal,
  useTrustpilotScore,
} from "@react-component-library/ui";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { ContactInfo } from "@/components/ContactInfo";
import { useLoadingModal } from "@/hooks/useLoadingModal";
import { getAssetPath } from "@/lib/get-asset-path";
import useJoinFlowStore from "@/store/useJoinFlowStore";

import { ChooseYourAddressText, slides } from "./ChooseYourAddressProps";
import { HeroBanner } from "./components/HeroBanner";
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
  const { resetFlow, setRoiPostcode, isLoadingModalOpen, affiliateSession } =
    useJoinFlowStore();
  const postcodeParam = useSearchParams().get("postcode");
  const { loadingModalRef, slidesWithAssetPath } = useLoadingModal({
    isLoadingModalOpen,
    slides,
  });

  useEffect(() => {
    resetFlow();
    // Set postcode after reset if we have one from URL params
    if (postcodeParam) {
      setRoiPostcode(postcodeParam);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <LoadingModal
        modalRef={loadingModalRef}
        slides={slidesWithAssetPath}
        loading={isLoadingModalOpen}
      />
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
          <HeroBanner affiliateContent={affiliateSession?.displayItems} />
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
              className="mt-8 md:mt-10"
            />
          )}
        </div>
      </div>
    </>
  );
};
