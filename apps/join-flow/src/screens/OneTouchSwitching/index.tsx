"use client";

import { Button } from "@react-component-library/ui";
import useJoinFlowStore, {
  BroadbandProvider,
  SwitchingDetails,
} from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Footer } from "@/components/Footer";
import { ReviewYourBasket } from "@/components/ReviewYourBasket";
import Stepper from "@/components/Stepper";
import { accountNumberSchema } from "@/screens/OneTouchSwitching/forms/formValues";

import { MatchResultType, OneTouchSwitchingFormData } from "./forms/formValues";
import OneTouchSwitchingForm from "./forms/oneTouchSwitchingForm";
import {
  broadbandProviders,
  oneTouchSwitchingText,
} from "./oneTouchSwitchingProps";

export const OneTouchSwitching = () => {
  const router = useRouter();
  const { setSwitchingDetails, switchingDetails, setCurrentStep } =
    useJoinFlowStore();

  const [matchResult, setMatchResult] = useState<MatchResultType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatProviderMessage = (
    message: string,
    provider?: BroadbandProvider,
  ) => {
    if (!provider) return message;
    return message.replace("{provider}", provider.name);
  };

  const handleSubmit = async (data: OneTouchSwitchingFormData) => {
    const isRetryingWithAccountNumber = matchResult && !matchResult.success;
    setIsSubmitting(true);

    if (data.accountNumber && data.accountNumber.trim().length > 0) {
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

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (
        isRetryingWithAccountNumber ||
        (data.accountNumber && data.accountNumber.trim().length > 0)
      ) {
        const provider = broadbandProviders.find((p) => p.id === data.provider);

        // Success case - account number matches expected value
        if (
          data.accountNumber &&
          data.accountNumber.trim() === "12345678" &&
          provider
        ) {
          setMatchResult({
            success: true,
            message: formatProviderMessage(
              oneTouchSwitchingText.matchSuccessMessage,
              provider,
            ),
            provider,
            hasUsedAccountNumber: true,
          });

          const switchData: SwitchingDetails = {
            isWillingToSwitch: true,
            currentProvider: provider,
            switchOrderReference: "12345678",
          };

          setSwitchingDetails(switchData);
          setCurrentStep(3);
          router.push("/join-flow/go-live-date");
        } else {
          // Failed matching with account number - still proceed to next step
          setMatchResult({
            success: false,
            message: oneTouchSwitchingText.accountNumberNotFoundMessage,
          });

          const switchData: SwitchingDetails = {
            isWillingToSwitch: false,
            currentProvider: {
              id: "noProvider",
              name: "noProvider",
              description: "No provider was selected",
            },
            switchOrderReference: "FAILED_OTS",
          };

          setSwitchingDetails(switchData);
          setCurrentStep(3);
          router.push("/join-flow/go-live-date");
        }
      } else {
        // First attempt without account number
        setMatchResult({
          success: false,
          message: oneTouchSwitchingText.noMatchMessage,
        });

        // We don't redirect here, so the user can enter an account number
      }
    } catch (error) {
      console.error("Error matching provider details:", error);
      setMatchResult({
        success: false,
        message: oneTouchSwitchingText.errorMessage,
      });

      if (
        isRetryingWithAccountNumber ||
        (data.accountNumber && data.accountNumber.trim().length > 0)
      ) {
        const switchData: SwitchingDetails = {
          isWillingToSwitch: false,
          currentProvider: {
            id: "noProvider",
            name: "noProvider",
            description: "No provider was selected",
          },
          switchOrderReference: "FAILED_OTS",
        };

        setSwitchingDetails(switchData);
        setCurrentStep(3);
        router.push("/join-flow/go-live-date");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    const switchData: SwitchingDetails = {
      isWillingToSwitch: false,
      currentProvider: {
        id: "noProvider",
        name: "noProvider",
        description: "No provider was selected",
      },
      switchOrderReference: "SKIPPED",
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
              defaultProvider={switchingDetails?.currentProvider?.id || ""}
              matchResult={matchResult}
              setMatchResult={setMatchResult}
              isSubmitting={isSubmitting}
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
