"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore, {
  BroadbandProvider,
  SwitchingDetails,
} from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { createSwitchMatchLookup } from "@/services/helpers/createSwitchMatchLookup";
import { getAllProviders } from "@/services/helpers/getAllProviders";
import { updateBasket } from "@/services/helpers/updateBasket";

import { MatchResultType, OneTouchSwitchingFormData } from "./forms/formValues";
import OneTouchSwitchingForm from "./forms/oneTouchSwitchingForm";
import { oneTouchSwitchingText } from "./oneTouchSwitchingProps";

export const OneTouchSwitching = () => {
  const router = useRouter();
  const { setSwitchingDetails, switchingDetails, setCurrentStep, basket } =
    useJoinFlowStore();

  const [matchResult, setMatchResult] = useState<MatchResultType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [providerError, setProviderError] = useState<boolean>(false);
  const [providers, setProviders] = useState<BroadbandProvider[]>([]);

  const otsSwitchStatus = switchingDetails?.otsSwitchStatus;
  const isSecondAttempt = otsSwitchStatus === "FIRST_ATTEMPT_FAILED";

  const handleOTSFailure = (provider?: BroadbandProvider) => {
    if (isSecondAttempt) {
      // Second attempt failed, proceed to next step with failed status
      const switchData: SwitchingDetails = {
        otsSwitchStatus: "OTS_FAILED",
      };

      setSwitchingDetails(switchData);
      setCurrentStep(3);
      router.push("/join-flow/go-live-date");
    } else {
      // First attempt failure, save the selected provider for good UX
      setSwitchingDetails({
        currentProvider: provider,
        otsSwitchStatus: "FIRST_ATTEMPT_FAILED",
      });
    }
  };

  const fetchProviders = async () => {
    const result = await getAllProviders();

    if (result.error) {
      console.error("Error fetching providers:", result.error);
      setProviderError(true);
      return;
    }

    setProviders(result.providers || []);
  };

  const handleSubmit = async (data: OneTouchSwitchingFormData) => {
    setIsSubmitting(true);

    // this should never happen
    if (!basket?.id) {
      console.error("No basket ID available for OTS");
      setMatchResult({
        success: false,
        message: oneTouchSwitchingText.errorMessage,
      });
      setIsSubmitting(false);
      return;
    }

    const provider = providers.find((p) => p.losingRcpid === data.provider);

    try {
      const result = await createSwitchMatchLookup(
        basket.id,
        data.provider,
        data.accountNumber,
      );

      // Success case - OTS matched successfully
      if (result.switchMatchLookup && provider) {
        await updateBasket(basket.id, {
          switchMatchLookup: result.switchMatchLookup,
        });
        const switchData: SwitchingDetails = {
          currentProvider: provider,
          switchOrderReference: result.switchMatchLookup,
          otsSwitchStatus: "SWITCH_SUCCESS",
        };

        setSwitchingDetails(switchData);
        setCurrentStep(3);
        router.push("/join-flow/go-live-date");
        return;
      }

      // Failure case - OTS did not match or API returned error
      if (result.error) {
        const errorMessage =
          result.error.message || oneTouchSwitchingText.noMatchMessage;

        setMatchResult({
          success: false,
          message: errorMessage,
        });
      }

      handleOTSFailure(provider);
    } catch (error) {
      console.error("Error during One Touch Switching API call:", error);

      setMatchResult({
        success: false,
        message: oneTouchSwitchingText.errorMessage,
      });

      handleOTSFailure(provider);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    const switchData: SwitchingDetails = {
      otsSwitchStatus: "SKIPPED",
    };

    setSwitchingDetails(switchData);
    setCurrentStep(3);
    router.push("/join-flow/go-live-date");
  };

  const handleFormSubmit = () => {
    document
      .getElementById("oneTouchSwitchingForm")
      ?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <>
      <StepNavigationWithBasket step={3} />
      <div className="container mx-auto flex flex-col items-center md:mt-6 lg:mt-12 md:mb-16">
        <div className="max-w-[720px] px-5 md:px-22 pt-10 md:pt-12 bg-core-white rounded-md">
          <h1 className="text-[26px] md:text-3xl font-semibold text-center pb-10 md:pb-12">
            {oneTouchSwitchingText.title}
          </h1>
          <div className="flex flex-col gap-10 md:gap-12">
            <OneTouchSwitchingForm
              onSubmit={handleSubmit}
              defaultProvider={
                switchingDetails?.currentProvider?.losingRcpid || ""
              }
              matchResult={matchResult}
              setMatchResult={setMatchResult}
              isSubmitting={isSubmitting}
              providers={providers}
              providerError={providerError}
            />

            {/* TODO: Add loading animation */}

            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="w-full md:w-1/2">
                <Button
                  onClick={handleSkip}
                  tint="white"
                  variant="outline"
                  type="button"
                  disabled={isSubmitting}
                  fullWidth
                >
                  {oneTouchSwitchingText.skipButtonText}
                </Button>
              </div>

              <div className="w-full md:w-1/2">
                <Button
                  onClick={handleFormSubmit}
                  tint="yellow"
                  variant="solid"
                  disabled={isSubmitting}
                  type="button"
                  fullWidth
                >
                  {isSubmitting
                    ? oneTouchSwitchingText.loadingButtonText
                    : isSecondAttempt
                      ? oneTouchSwitchingText.retryButtonText
                      : oneTouchSwitchingText.submitButtonText}
                </Button>
              </div>
            </div>
          </div>
          <hr className="mt-10 md:hidden border-ui-grey-300 bg-ui-grey-300 border w-full" />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OneTouchSwitching;
