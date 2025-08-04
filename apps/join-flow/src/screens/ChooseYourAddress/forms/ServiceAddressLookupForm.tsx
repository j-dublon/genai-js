import useJoinFlowStore, {
  ExtendedStoreAddress,
} from "@store/useJoinFlowStore";
import { useRouter, useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";

import { AddressLookupForm } from "@/components/AddressLookupForm/index";
import { createQuoteLookupPoll } from "@/services/helpers/createQuoteLookupPoll";

import { ChooseYourAddressText } from "../ChooseYourAddressProps";

export const ServiceAddressLookupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams().get("postcode");
  const {
    setServiceAddress,
    affiliateSession,
    setQuoteResponse,
    setRoiPostcode,
    setIsLoadingModalOpen,
    setErrorInfo,
  } = useJoinFlowStore();

  const posthog = usePostHog();

  const handleAddressSelected = async (
    selectedAddress: ExtendedStoreAddress,
  ) => {
    setServiceAddress(selectedAddress);
    posthog.capture("join_flow_selected_address");

    if (!affiliateSession) {
      console.error("No affiliate session available");
      throw new Error(
        "Session information is missing. Please refresh the page or try again later.",
      );
    }

    setIsLoadingModalOpen(true);
    try {
      const quoteResult = await createQuoteLookupPoll(
        affiliateSession.id,
        selectedAddress.id,
        selectedAddress.selectionIdentifier,
      );

      if (
        quoteResult.products &&
        quoteResult.quotingCode &&
        quoteResult.documentID
      ) {
        setQuoteResponse({
          documentID: quoteResult.documentID,
          response: {
            products: quoteResult.products,
            quotingCode: quoteResult.quotingCode,
          },
        });
        router.push("/join-flow/package-selection");
        return;
      } else if (quoteResult?.error) {
        const errorType = quoteResult.error.type;

        switch (errorType) {
          case "joinSuspended":
            router.push("/join-flow/register-interest/unavailable");
            return;

          case "unknownError":
            setErrorInfo({
              type: errorType,
            });
            router.push("/join-flow/error");
            return;

          case "invalidAddressError":
            router.push("/join-flow/register-interest/cannot-service-address");
            return;

          default:
            console.error("Unknown error type:", errorType);
            setErrorInfo({
              type: "unknownError",
            });
            router.push("/join-flow/error");
            return;
        }
      } else {
        setErrorInfo({
          type: "unknownError",
        });
        router.push("/join-flow/error");
      }
    } catch {
      setErrorInfo({
        type: "unknownError",
      });
      router.push("/join-flow/error");
    } finally {
      setIsLoadingModalOpen(false);
    }
  };

  const handlePostcodeChange = useCallback(
    (postcode: string | null) => {
      setRoiPostcode(postcode || null);
    },
    [setRoiPostcode],
  );

  return (
    <AddressLookupForm
      onAddressSelected={handleAddressSelected}
      onPostcodeChange={handlePostcodeChange}
      initialPostcode={searchParams || ""}
      fullWidth={true}
      buttonText={{
        search: ChooseYourAddressText.searchForMyAddressButtonText,
        continue: ChooseYourAddressText.continueButtonText,
      }}
      addressNotFoundAction={() => {
        router.push("/join-flow/register-interest/not-shown");
      }}
    />
  );
};
