"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@react-component-library/ui";
import type { PersonalDetails } from "@store/useJoinFlowStore";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { formatDateOfBirth } from "@/lib/formatDate";
import { AdditionalPersonalDetailsForm } from "@/screens/PersonalDetails/forms/additionalPersonalDetailsForm";
import { EmailVerificationForm } from "@/screens/PersonalDetails/forms/emailVerificationForm";
import { InitialPersonalDetailsForm } from "@/screens/PersonalDetails/forms/initialPersonalDetailsForm";
import { runCreditCheck } from "@/services/helpers/runCreditCheck";
import { sendEmailCode } from "@/services/helpers/sendEmailCode";
import { updateBasket } from "@/services/helpers/updateBasket";
import { validateEmailCode } from "@/services/helpers/validateEmailCode";

import {
  AdditionalPersonalDetailsFormProps,
  createStepBasedPersonalDetailsSchema,
  EmailVerificationFormProps,
  InitialPersonalDetailsProps,
} from "./forms/formValues";
import { personalDetailsProps } from "./personalDetailsProps";

const PersonalDetails = () => {
  const router = useRouter();
  const {
    setPersonalDetails,
    personalDetails,
    setCurrentStep,
    serviceAddress,
    basket,
    softCreditCheck,
    setBasket,
    setSoftCreditCheck,
  } = useJoinFlowStore();

  const initialStep = personalDetails?.personalDetailsStep || "details";
  const [currentFormStep, setCurrentFormStep] = useState<
    "details" | "verification" | "additional"
  >(initialStep);

  const [isEmailVerified, setIsEmailVerified] = useState(
    personalDetails?.isVerified,
  );
  const [isEmailCodeValid, setIsEmailCodeValid] = useState<boolean | undefined>(
    undefined,
  );
  const [emailCodeErrorMessage, setEmailCodeErrorMessage] = useState<
    string | undefined
  >(undefined);

  const [previousEmail, setPreviousEmail] = useState<string | undefined>(
    personalDetails?.email,
  );
  const [validationCode, setValidationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const getStepSchema = () => {
    return createStepBasedPersonalDetailsSchema(
      personalDetailsProps,
      currentFormStep,
    ) as z.ZodType<PersonalDetails>;
  };

  const validateCode = async (code: string) => {
    if (!basket) {
      console.error("No basket available");
      setIsEmailCodeValid(false);
      return;
    }

    const response = await validateEmailCode(basket.id, code);

    if (response.error) {
      if (
        response.error.details.find((detail) => detail.includes("invalidCode"))
      ) {
        setEmailCodeErrorMessage("This code does not match what we expected");
      }
      console.error("Failed to validate email code:", response.error);
      setIsEmailCodeValid(false);
      return;
    }

    if (response.success) {
      setIsEmailCodeValid(true);
      setEmailCodeErrorMessage(undefined);
    } else {
      setIsEmailCodeValid(false);
    }
  };

  const handleCodeChange = async (value: string, index: number) => {
    const newCode = [...validationCode];
    newCode[index] = value;

    if (value.length <= 1) {
      setValidationCode(newCode);

      if (newCode.every((digit) => digit !== "")) {
        const code = newCode.join("");
        if (code.length === 6 && !isEmailCodeValid) {
          await validateCode(code);
        }
      }
    }
  };

  const handleSendCode = async () => {
    if (!isEmailVerified) {
      if (!basket) {
        console.error("No basket available");
        return;
      }

      const response = await sendEmailCode(basket.id);
      if (response.error) {
        if (
          response.error.details.find((detail) =>
            detail.includes("emailCodeTooRecent"),
          )
        ) {
          setEmailCodeErrorMessage(
            "An email validation code was already requested recently. Please wait a moment.",
          );
        } else if (
          response.error.details.find((detail) =>
            detail.includes("emailCodeSpam"),
          )
        ) {
          setEmailCodeErrorMessage("Too many code requests.");
        }
        console.error("Failed to send email code:", response.error);
        return;
      }

      if (response.success) {
        setEmailCodeErrorMessage(undefined);
      }
    }
  };

  const {
    register,
    watch,
    formState: { errors },
    reset,
    getValues,
    trigger,
    control,
  } = useForm<PersonalDetails>({
    resolver: zodResolver(getStepSchema()),
    defaultValues: {
      firstName: personalDetails?.firstName || "",
      lastName: personalDetails?.lastName || "",
      phone: personalDetails?.phone || "",
      hasSmartphone: (personalDetails?.hasSmartphone as "yes" | "no") || "",
      email: personalDetails?.email || "",
      confirmEmail: personalDetails?.confirmEmail || "",
      isVerified: personalDetails?.isVerified ?? false,
      dobDay: personalDetails?.dobDay || "",
      dobMonth: personalDetails?.dobMonth || "",
      dobYear: personalDetails?.dobYear || "",
      residencyDuration: personalDetails?.residencyDuration || null,
      marketingConsent: personalDetails?.marketingConsent ?? false,
      personalDetailsStep: personalDetails?.personalDetailsStep || "details",
      personalDetailsCompleted:
        personalDetails?.personalDetailsCompleted || false,
      requiresLandline: personalDetails?.requiresLandline ?? false,
    },
  });

  const [hasSubmittedDetails, setHasSubmittedDetails] = useState<boolean>(
    !!personalDetails?.firstName,
  );
  const [hasSubmittedAdditional, setHasSubmittedAdditional] = useState<boolean>(
    !!personalDetails?.dobDay,
  );

  useEffect(() => {
    reset(
      {
        ...(personalDetails || {}),
        personalDetailsStep: currentFormStep,
      },
      {
        keepValues: true,
        keepDefaultValues: true,
        keepDirty: false,
      },
    );
  }, [currentFormStep, reset, personalDetails]);

  const hasSmartphoneValue = watch("hasSmartphone");
  const dobDay = watch("dobDay");
  const dobMonth = watch("dobMonth");
  const dobYear = watch("dobYear");
  const residencyDuration = watch("residencyDuration");
  const currentEmail = watch("email");
  const requiresLandline = watch("requiresLandline");

  const handleContinueFormDetails = async () => {
    try {
      setHasSubmittedDetails(true);
      const isFormValid = await trigger();
      if (!isFormValid) {
        return;
      }

      const formValues = getValues();
      if (formValues.email !== previousEmail) await onEmailChanged();
      setPreviousEmail(formValues.email);
      const nextStep =
        isEmailVerified && formValues.email === previousEmail
          ? "additional"
          : "verification";

      const updatedDetails: PersonalDetails = {
        ...personalDetails,
        firstName: formValues.firstName || "",
        lastName: formValues.lastName || "",
        phone: formValues.phone || "",
        hasSmartphone: formValues.hasSmartphone || "",
        email: formValues.email || "",
        confirmEmail: formValues.confirmEmail || "",
        marketingConsent:
          formValues.marketingConsent !== undefined
            ? formValues.marketingConsent
            : false,
        personalDetailsStep: nextStep,
        personalDetailsCompleted: false,
        isVerified: isEmailVerified ?? false,
        verificationCode: isEmailVerified ? "123456" : "",
        dobDay: personalDetails?.dobDay || "",
        dobMonth: personalDetails?.dobMonth || "",
        dobYear: personalDetails?.dobYear || "",
        residencyDuration: personalDetails?.residencyDuration || null,
        requiresLandline:
          formValues.requiresLandline !== undefined
            ? formValues.requiresLandline
            : false,
      } as PersonalDetails;

      try {
        if (!basket) {
          console.error("No basket available");
          return;
        }

        const result = await updateBasket(basket.id, {
          personalDetails: {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            email: formValues.email,
            phone: formValues.phone,
          },
          optIns: {
            ...basket.optIns,
            hasSmartPhone: formValues.hasSmartphone === "yes",
          },
        });

        if (result.basket) {
          setBasket(result.basket);
        } else if (result.error) {
          console.error("Failed to update basket:", result.error);
        }
      } catch (error) {
        console.error("Unexpected error updating basket:", error);
        return;
      }

      await handleSendCode();

      setPersonalDetails(updatedDetails);
      setCurrentFormStep(nextStep);
    } catch (error) {
      //Keep this for now while we're dev-ing
      console.log(error);
    }
  };

  const handleVerification = async () => {
    const isFormValid = await trigger();

    if (!isFormValid) {
      return;
    }

    if (personalDetails) {
      const updatedDetails: PersonalDetails = {
        ...personalDetails,
        personalDetailsStep: "additional",
        personalDetailsCompleted: false,
        marketingConsent: personalDetails.marketingConsent,
        isVerified: true,
      } as PersonalDetails;

      setPersonalDetails(updatedDetails);
    }
    setIsEmailVerified(true);
    setCurrentFormStep("additional");
  };

  const onVerificationSuccess = async () => {
    const isFormValid = await trigger();

    if (!isFormValid) {
      return;
    }

    if (personalDetails) {
      const updatedDetails: PersonalDetails = {
        ...personalDetails,
        personalDetailsStep: "additional",
        isVerified: isEmailVerified ?? false,
      } as PersonalDetails;
      setPersonalDetails(updatedDetails);
    }
    setCurrentFormStep("additional");
  };

  const onEmailChanged = () => {
    setIsEmailCodeValid(undefined);
    setIsEmailVerified(undefined);
  };

  const onSubmitAdditionalDetails = async () => {
    setHasSubmittedAdditional(true);
    const isFormValid = await trigger();

    if (!isFormValid) {
      return;
    }

    if (
      !dobDay ||
      !dobMonth ||
      !dobYear ||
      !residencyDuration ||
      !personalDetails
    ) {
      return;
    }

    const updatedDetails: PersonalDetails = {
      ...personalDetails,
      dobDay,
      dobMonth,
      dobYear,
      residencyDuration,
      requiresLandline,
      personalDetailsCompleted: true,
      marketingConsent: personalDetails.marketingConsent,
      personalDetailsStep: "additional",
    } as PersonalDetails;

    setPersonalDetails(updatedDetails);
    setCurrentStep(2);
    try {
      if (!basket) {
        console.error("No basket available");
        return;
      }

      const result = await updateBasket(basket.id, {
        ...basket,
        personalDetails: {
          firstName: updatedDetails.firstName,
          lastName: updatedDetails.lastName,
          dateOfBirth: formatDateOfBirth(dobDay, dobMonth, dobYear),
          email: personalDetails.email,
          phone: personalDetails.phone,
        },
        // TODO: this is temporary to get the address history to the credit check endpoint, until address form is completed
        addressHistory: [
          {
            line1: serviceAddress?.line1,
            line2: serviceAddress?.line2,
            line3: serviceAddress?.line3,
            postcode: serviceAddress?.postcode,
            id: serviceAddress?.identifiers?.[0]?.id,
          },
        ],
      });

      if (result.basket) {
        setBasket(result.basket);
      } else if (result.error) {
        console.error("Failed to update basket:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error updating basket:", error);
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
        console.error("Failed to run soft credit check:", error);
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
    } catch (error) {
      console.error("Unexpected error during soft credit check:", error);
      return;
    }
  };

  const handleBack = () => {
    if (currentFormStep === "verification") {
      if (personalDetails) {
        const updatedDetails: PersonalDetails = {
          ...personalDetails,
          personalDetailsStep: "details",
          marketingConsent: personalDetails.marketingConsent,
          personalDetailsCompleted:
            personalDetails.personalDetailsCompleted ?? false,
          isVerified: isEmailVerified ?? false,
        } as PersonalDetails;
        setPersonalDetails(updatedDetails);
      }
      setCurrentFormStep("details");
    } else if (currentFormStep === "additional") {
      if (personalDetails) {
        const updatedDetails: PersonalDetails = {
          ...personalDetails,
          personalDetailsStep: "details",
          marketingConsent: personalDetails.marketingConsent,
          personalDetailsCompleted:
            personalDetails.personalDetailsCompleted ?? false,

          isVerified: isEmailVerified ?? false,
        } as PersonalDetails;
        setPersonalDetails(updatedDetails);
      }
      setCurrentFormStep("details");
    } else {
      setCurrentStep(0);
      router.push("/join-flow");
    }
  };

  const InitialPersonalDetailsComponent =
    InitialPersonalDetailsForm as React.ComponentType<InitialPersonalDetailsProps>;

  const EmailVerificationFormComponent =
    EmailVerificationForm as React.ComponentType<EmailVerificationFormProps>;

  const AdditionalFormComponent =
    AdditionalPersonalDetailsForm as React.ComponentType<AdditionalPersonalDetailsFormProps>;

  return (
    <>
      <StepNavigationWithBasket step={1} />
      <div className="container mx-auto px-6 py-8 lg:pt-24">
        <div className="max-w-[569px] mx-auto py-8 rounded-lg">
          <h1 className="text-2xl text-center font-bold mb-6">
            {personalDetailsProps.pageTitle}
          </h1>

          {currentFormStep === "verification" && isEmailVerified && (
            <p className="text-center mb-4">Email is verified</p>
          )}

          {currentFormStep === "details" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-md font-bold">
                {personalDetailsProps.sectionTitle}
              </h2>
              <p className="text-md">
                Fields marked <span className="text-ui-error">*</span> are
                required
              </p>
              <InitialPersonalDetailsComponent
                register={register}
                errors={errors}
                hasSmartphoneValue={hasSmartphoneValue}
                personalDetailsProps={personalDetailsProps}
                control={control}
                hasSubmitted={hasSubmittedDetails}
              />
            </div>
          )}

          {currentFormStep === "verification" && !isEmailVerified && (
            <EmailVerificationFormComponent
              register={register}
              errors={errors}
              userVerificationErrorMessage={emailCodeErrorMessage}
              verificationSection={personalDetailsProps.verificationSection}
              isVerified={isEmailVerified}
              onVerificationSuccess={onVerificationSuccess}
              currentEmail={currentEmail}
              handleCodeChange={handleCodeChange}
              validateCode={validateCode}
              isCodeValid={isEmailCodeValid}
              handleBack={handleBack}
              handleResendCode={handleSendCode}
            />
          )}

          {currentFormStep === "additional" && (
            <AdditionalFormComponent
              register={register}
              errors={errors}
              personalDetailsProps={personalDetailsProps}
              address={serviceAddress}
              control={control}
              requiresLandline={requiresLandline}
              hasSubmitted={hasSubmittedAdditional}
            />
          )}
          <div className="flex flex-col md:flex-row justify-between mt-8 gap-6">
            <div className="flex-1">
              <Button
                onClick={handleBack}
                tint="white"
                variant="outline"
                type="button"
                fullWidth={true}
                className=""
              >
                {personalDetailsProps.buttons.back}
              </Button>
            </div>

            {currentFormStep === "details" && (
              <div className="flex-3">
                <Button
                  tint="yellow"
                  variant="solid"
                  type="button"
                  fullWidth={true}
                  onClick={handleContinueFormDetails}
                  disabled={hasSmartphoneValue === "no"}
                >
                  {personalDetailsProps.buttons.continue}
                </Button>
              </div>
            )}

            {currentFormStep === "verification" && !isEmailVerified && (
              <Button
                tint="yellow"
                variant="solid"
                type="button"
                fullWidth={true}
                onClick={handleVerification}
                disabled={!isEmailCodeValid}
              >
                {personalDetailsProps.buttons.verify}
              </Button>
            )}

            {currentFormStep === "verification" && isEmailVerified && (
              <Button
                tint="yellow"
                variant="solid"
                type="button"
                fullWidth={true}
                onClick={onVerificationSuccess}
              >
                {personalDetailsProps.buttons.continue}
              </Button>
            )}

            {currentFormStep === "additional" && (
              <Button
                tint="yellow"
                variant="solid"
                type="button"
                fullWidth={true}
                disabled={requiresLandline}
                onClick={onSubmitAdditionalDetails}
              >
                {personalDetailsProps.buttons.continueToEero}
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PersonalDetails;
