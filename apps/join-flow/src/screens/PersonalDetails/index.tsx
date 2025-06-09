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
import { updateBasket } from "@/services/helpers/updateBasket";

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
    setBasket,
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

  // this will call the validate endpoint eventually
  const validateCode = (code: string) =>
    code.toString() === "123456"
      ? setIsEmailCodeValid(true)
      : setIsEmailCodeValid(false);

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...validationCode];
    newCode[index] = value;

    if (value.length <= 1) {
      setValidationCode(newCode);

      if (newCode.every((digit) => digit !== "")) {
        const code = newCode.join("");
        if (code.length === 6) {
          validateCode(code);
        }
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
      });

      if (result.basket) {
        setBasket(result.basket);
        router.push("/join-flow/eero-selection");
      } else if (result.error) {
        console.error("Failed to create basket:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error creating basket:", error);
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
      <div className="container mx-auto px-6 py-8 pt-20">
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
              verificationSection={personalDetailsProps.verificationSection}
              isVerified={isEmailVerified}
              onVerificationSuccess={onVerificationSuccess}
              currentEmail={currentEmail}
              handleCodeChange={handleCodeChange}
              validateCode={validateCode}
              isCodeValid={isEmailCodeValid}
              handleBack={handleBack}
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
