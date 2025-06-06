"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore, {
  BroadbandProvider,
  SwitchingDetails,
} from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Footer } from "@/components/Footer";
import { ReviewYourBasket } from "@/components/ReviewYourBasket";
import Stepper from "@/components/Stepper";
import { accountNumberSchema } from "@/screens/OneTouchSwitching/forms/formValues";
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
    const accountNumberProvided =
      data.accountNumber && data.accountNumber.trim().length > 0;

    if (accountNumberProvided) {
      const result = accountNumberSchema.safeParse(data.accountNumber);
      if (!result.success) {
        setMatchResult({
          success: false,
          message: result.error.errors[0].message,
        });
        setIsSubmitting(false);
        return;
      }
    }

    if (isSecondAttempt && !accountNumberProvided) {
      setMatchResult({
        success: false,
        message: "Account number is required for verification",
      });
      setIsSubmitting(false);
      return;
    }

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
      <ReviewYourBasket />
      <div className="container mx-auto px-4 py-8">
        <Stepper />

        <div className="max-w-3xl mx-auto">
          <div className="bg-core-white p-8 rounded-md">
            <h1 className="text-2xl font-bold mb-2">
              {oneTouchSwitchingText.title}
            </h1>
            <p className="text-ui-grey-500 mb-6">
              {oneTouchSwitchingText.subtitle}
            </p>

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

            <div className="flex justify-between mt-8">
              <Button
                onClick={handleSkip}
                tint="white"
                variant="outline"
                type="button"
                disabled={isSubmitting}
              >
                {oneTouchSwitchingText.skipButtonText}
              </Button>

              <Button
                onClick={handleFormSubmit}
                tint="yellow"
                variant="solid"
                disabled={isSubmitting}
                type="button"
              >
                {isSubmitting
                  ? oneTouchSwitchingText.loadingButtonText
                  : oneTouchSwitchingText.submitButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OneTouchSwitching;
