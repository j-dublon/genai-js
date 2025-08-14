import useJoinFlowStore, {
  ExtendedStoreAddress,
} from "@store/useJoinFlowStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { AddressLookupForm } from "@/components/AddressLookupForm/index";
import { createQuoteLookupPoll } from "@/services/helpers/createQuoteLookupPoll";
import { captureJoinFlowEvent } from "@/tracking/posthogUtilWrappers";

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

  const handleAddressSelected = async (
    selectedAddress: ExtendedStoreAddress,
  ) => {
    setServiceAddress(selectedAddress);

    if (!affiliateSession) {
      const errorMessage =
        "Session information is missing. Please refresh the page or try again later.";
      captureJoinFlowEvent("join_flow_selected_address", {
        subFeature: "address-lookup",
        outcome: "error",
        type: "select",
        errorMessage,
      });
      throw new Error(errorMessage);
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
        captureJoinFlowEvent("join_flow_selected_address", {
          subFeature: "address-lookup",
          outcome: "success",
          type: "select",
        });
        router.push("/join-flow/package-selection");
        return;
      } else if (quoteResult?.error) {
        captureJoinFlowEvent("join_flow_selected_address", {
          subFeature: "address-lookup",
          outcome: "error",
          type: "select",
          errorMessage: quoteResult.error.message,
        });
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
        captureJoinFlowEvent("join_flow_selected_address", {
          subFeature: "address-lookup",
          outcome: "error",
          type: "select",
          errorMessage: "Unknown error",
        });
        setErrorInfo({
          type: "unknownError",
        });
        router.push("/join-flow/error");
      }
    } catch {
      captureJoinFlowEvent("join_flow_selected_address", {
        subFeature: "address-lookup",
        outcome: "error",
        type: "select",
        errorMessage: "Unknown error",
      });
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
