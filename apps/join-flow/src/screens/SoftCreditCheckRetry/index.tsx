"use client";
import { Button, TipCard } from "@react-component-library/ui";
import { useRouter } from "next/navigation";

import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { formatDateOfBirth } from "@/lib/formatDate";
import { getAssetPath } from "@/lib/get-asset-path";
import { runCreditCheck } from "@/services/helpers/runCreditCheck";
import { updateBasket } from "@/services/helpers/updateBasket";
import useJoinFlowStore, {
  type PersonalDetails,
} from "@/store/useJoinFlowStore";

import { SoftCreditCheckRetryFormValues } from "./forms/formValues";
import { RetryCheckForm } from "./forms/RetryCheckForm";
import { softCreditCheckRetryProps } from "./SoftCreditCheckRetryProps";

const SoftCreditCheckRetry = () => {
  const router = useRouter();
  const {
    basket,
    personalDetails,
    setBasket,
    setPersonalDetails,
    softCreditCheck,
    setSoftCreditCheck,
    setErrorInfo,
  } = useJoinFlowStore();

  const onRetry = async (
    data: SoftCreditCheckRetryFormValues,
  ): Promise<void> => {
    const updatedDetails = {
      ...personalDetails,
      dateOfBirth: formatDateOfBirth(data.dobDay, data.dobMonth, data.dobYear),
    } as PersonalDetails;

    setPersonalDetails(updatedDetails);

    try {
      if (!basket) {
        setErrorInfo({ type: "basketError" });
        router.push("/join-flow/error");
        return;
      }

      const result = await updateBasket(basket.id, {
        personalDetails: updatedDetails,
        addressHistory: [
          ...(basket.addressHistory ?? []),
          ...(data.residencyDuration === "under-year"
            ? [
                {
                  line1: data.addressLine1,
                  line2: data.addressLine2,
                  line3: data.addressLine3,
                  postcode: data.postcode,
                },
              ]
            : []),
        ],
      });

      if (result.basket) {
        setBasket(result.basket);
      } else if (result.error) {
        console.error("Failed to update basket:", result.error);
        setErrorInfo({ type: result.error.type });
        router.push("/join-flow/error");
        return;
      }
    } catch {
      setErrorInfo({ type: "unknownError" });
      router.push("/join-flow/error");
      return;
    }

    try {
      let latestStatus = softCreditCheck?.latestStatus ?? null;
      let softCreditCheckAttempts = softCreditCheck?.attempts ?? 0;
      let error = null;

      if (softCreditCheckAttempts <= 2 && latestStatus !== "PASSED") {
        const creditCheckResult = await runCreditCheck(basket.id);
        softCreditCheckAttempts++;
        latestStatus = creditCheckResult.status ?? null;
        error = creditCheckResult.error;
      }

      if (softCreditCheckAttempts > 2 && latestStatus === "NO_MATCH") {
        latestStatus = "FAILED";
      }

      if (error) {
        switch (error.type) {
          case "basketError":
            setErrorInfo({ type: "basketError" });
            router.push("/join-flow/error");
            break;
          case "creditCheckLimitReached":
            setErrorInfo({ type: "creditCheckLimitReached" });
            router.push("/join-flow/error");
            break;
          case "creditCheckLoadHashedError":
            setErrorInfo({ type: "creditCheckLoadHashedError" });
            router.push("/join-flow/error");
            break;
          default:
            setErrorInfo({ type: error.type });
            router.push("/join-flow/error");
            break;
        }
        return;
      }

      setSoftCreditCheck({
        latestStatus,
        attempts: softCreditCheckAttempts,
      });

      switch (latestStatus) {
        case "FAILED":
          router.push("/join-flow/personal-details/check-failed");
          break;
        case "PASSED":
          router.push("/join-flow/eero-selection");
          break;
        case "NO_MATCH":
          router.push("/join-flow/personal-details/retry-check");
          break;
        default:
          break;
      }
    } catch {
      setErrorInfo({ type: "unknownError" });
      router.push("/join-flow/error");
      return;
    }
  };

  return (
    <>
      <StepNavigationWithBasket step={4} />
      <div className="container mx-auto px-6 py-10 md:pb-16">
        <div className="max-w-[569px] mx-auto rounded-lg flex flex-col gap-10 md:gap-12">
          <h1 className="text-xl md:text-2xl text-center font-semibold leading-[150%] md:leading-[138%]">
            {softCreditCheckRetryProps.heading}
          </h1>
          <div>
            <TipCard
              image={getAssetPath("/images/signingUp.svg")}
              className="mb-4 items-center justify-center bg-tertiary-orange/30 md:mb-6 md:w-full"
              hideImageOnMobile
            >
              <span>
                <span className="text-xs font-semibold text-tertiary-peach md:text-sm">
                  {softCreditCheckRetryProps.tipCard.heading}
                </span>{" "}
                {softCreditCheckRetryProps.tipCard.paragraph}
              </span>
            </TipCard>
            <RetryCheckForm onSubmit={onRetry} />
            <div className="flex flex-col gap-2 text-xs font-normal leading-[160%]">
              {softCreditCheckRetryProps.summarySection.paragraph}
            </div>
          </div>
          <Button
            tint="yellow"
            variant="solid"
            form="retryCheckForm"
            type="submit"
            fullWidth={true}
          >
            {softCreditCheckRetryProps.summarySection.buttonText}
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SoftCreditCheckRetry;
