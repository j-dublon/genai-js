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
import { ReviewYourBasket } from "@/components/ReviewYourBasket";
import Stepper from "@/components/Stepper";
import AdditionalPersonalDetailsForm from "@/screens/PersonalDetails/forms/additionalPersonalDetailsForm";
import EmailVerificationForm from "@/screens/PersonalDetails/forms/emailVerificationForm";
import InitialPersonalDetailsForm from "@/screens/PersonalDetails/forms/initialPersonalDetailsForm";

import {
  AdditionalPersonalDetailsFormProps,
  createStepBasedPersonalDetailsSchema,
  EmailVerificationFormProps,
  InitialPersonalDetailsProps,
} from "./forms/formValues";
import { personalDetailsProps } from "./personalDetailsProps";

const PersonalDetails = () => {
  const router = useRouter();
  const { setPersonalDetails, personalDetails, setCurrentStep } =
    useJoinFlowStore();

  const initialStep = personalDetails?.personalDetailsStep || "details";
  const [currentFormStep, setCurrentFormStep] = useState<
    "details" | "verification" | "additional"
  >(initialStep);

  const [isEmailVerified, setIsEmailVerified] = useState(
    Boolean(personalDetails?.verificationCode === "123456"),
  );
  const [previousEmail, setPreviousEmail] = useState<string | undefined>(
    personalDetails?.email,
  );

  const getStepSchema = () => {
    return createStepBasedPersonalDetailsSchema(
      personalDetailsProps,
      currentFormStep,
    ) as z.ZodType<PersonalDetails>;
  };

  const {
    register,
    watch,
    formState: { errors },
    reset,
    getValues,
    trigger,
  } = useForm<PersonalDetails>({
    resolver: zodResolver(getStepSchema()),
    defaultValues: {
      firstName: personalDetails?.firstName || "",
      lastName: personalDetails?.lastName || "",
      phone: personalDetails?.phone || "",
      hasSmartphone: (personalDetails?.hasSmartphone as "yes" | "no") || "yes",
      email: personalDetails?.email || "",
      confirmEmail: personalDetails?.confirmEmail || "",
      verificationCode: personalDetails?.verificationCode || "",
      dobDay: personalDetails?.dobDay || "",
      dobMonth: personalDetails?.dobMonth || "",
      dobYear: personalDetails?.dobYear || "",
      residencyDuration: personalDetails?.residencyDuration || null,
      marketingConsent: personalDetails?.marketingConsent ?? false,
      personalDetailsStep: personalDetails?.personalDetailsStep || "details",
      personalDetailsCompleted:
        personalDetails?.personalDetailsCompleted || false,
    },
    mode: "onChange",
  });

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
  const verificationCode = watch("verificationCode");
  const dobDay = watch("dobDay");
  const dobMonth = watch("dobMonth");
  const dobYear = watch("dobYear");
  const residencyDuration = watch("residencyDuration");
  const currentEmail = watch("email");

  useEffect(() => {
    if (previousEmail && previousEmail !== currentEmail) {
      setIsEmailVerified(false);
      setPreviousEmail(currentEmail);
    }
  }, [currentEmail, previousEmail]);

  useEffect(() => {
    if (personalDetails?.verificationCode === "123456") {
      setIsEmailVerified(true);
    }
  }, [personalDetails]);

  const handleContinueFromDetails = async () => {
    try {
      const isFormValid = await trigger();

      if (!isFormValid) {
        return;
      }

      const formValues = getValues();
      const nextStep = isEmailVerified ? "additional" : "verification";

      const updatedDetails: PersonalDetails = {
        ...personalDetails,
        firstName: formValues.firstName || "",
        lastName: formValues.lastName || "",
        phone: formValues.phone || "",
        hasSmartphone: formValues.hasSmartphone || "yes",
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

    if (verificationCode === "123456") {
      if (personalDetails) {
        const updatedDetails: PersonalDetails = {
          ...personalDetails,
          verificationCode: "123456",
          personalDetailsStep: "additional",
          personalDetailsCompleted: false,
          marketingConsent: personalDetails.marketingConsent,
        } as PersonalDetails;

        setPersonalDetails(updatedDetails);
      }
      setIsEmailVerified(true);
      setPreviousEmail(currentEmail); // Update previousEmail with the verified email
      setCurrentFormStep("additional");
    } else {
      alert(personalDetailsProps.verificationSection.invalidCodeText);
    }
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
    setIsEmailVerified(false);
  };

  const onSubmitAdditionalDetails = async () => {
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
      personalDetailsCompleted: true,
      marketingConsent: personalDetails.marketingConsent,
      personalDetailsStep: "additional",
    } as PersonalDetails;

    setPersonalDetails(updatedDetails);
    setCurrentStep(2);
    router.push("/join-flow/eero-selection");
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
          verificationCode: personalDetails.verificationCode || "",
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

          verificationCode: personalDetails.verificationCode || "",
        } as PersonalDetails;
        setPersonalDetails(updatedDetails);
      }
      setCurrentFormStep("details");
    } else {
      setCurrentStep(0);
      router.push("/join-flow");
    }
  };

  const renderMarketingText = () => {
    const text = personalDetailsProps.marketingSection.text;
    const parts = text.split("Privacy Notice");

    return (
      <>
        {parts[0]}
        <a
          href={personalDetailsProps.marketingSection.privacyNoticeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ui-link underline hover:text-tertiary-purple cursor-pointer"
          style={{ transition: "color 0.2s ease" }}
        >
          {personalDetailsProps.marketingSection.privacyNoticeText}
        </a>
        {parts[1]}
      </>
    );
  };

  const InitialPersonalDetailsComponent =
    InitialPersonalDetailsForm as React.ComponentType<InitialPersonalDetailsProps>;

  const EmailVerificationFormComponent =
    EmailVerificationForm as React.ComponentType<EmailVerificationFormProps>;

  const AdditionalFormComponent =
    AdditionalPersonalDetailsForm as React.ComponentType<AdditionalPersonalDetailsFormProps>;

  return (
    <>
      <ReviewYourBasket />
      <div className="container mx-auto px-4 py-8">
        <Stepper />

        <div className="max-w-2xl mx-auto p-8 rounded-lg">
          <h1 className="text-2xl text-center font-bold mb-6">
            {personalDetailsProps.pageTitle}
          </h1>

          {currentFormStep === "verification" && isEmailVerified && (
            <p className="text-center mb-4">Email is verified</p>
          )}

          {currentFormStep === "details" && (
            <>
              <h2 className="text-md font-bold mb-6">
                {personalDetailsProps.sectionTitle}
              </h2>
              <p className="text-md mb-4">
                {personalDetailsProps.requiredFieldsText}
              </p>
              <InitialPersonalDetailsComponent
                register={register}
                errors={errors}
                hasSmartphoneValue={hasSmartphoneValue}
                personalDetailsProps={personalDetailsProps}
                renderMarketingText={renderMarketingText}
              />
            </>
          )}

          {currentFormStep === "verification" && !isEmailVerified && (
            <EmailVerificationFormComponent
              register={register}
              errors={errors}
              personalDetailsProps={personalDetailsProps}
              isVerified={isEmailVerified}
              onVerificationSuccess={onVerificationSuccess}
              onEmailChanged={onEmailChanged}
              currentEmail={currentEmail}
              previousEmail={previousEmail}
            />
          )}

          {currentFormStep === "additional" && (
            <AdditionalFormComponent
              register={register}
              errors={errors}
              personalDetailsProps={personalDetailsProps}
            />
          )}
          <div className="flex justify-between mt-8">
            <Button
              onClick={handleBack}
              tint="white"
              variant="outline"
              type="button"
            >
              {personalDetailsProps.buttons.back}
            </Button>

            {currentFormStep === "details" && (
              <Button
                tint="yellow"
                variant="solid"
                type="button"
                onClick={handleContinueFromDetails}
              >
                {personalDetailsProps.buttons.continue}
              </Button>
            )}

            {currentFormStep === "verification" && !isEmailVerified && (
              <Button
                tint="yellow"
                variant="solid"
                type="button"
                onClick={handleVerification}
                disabled={!verificationCode}
              >
                {personalDetailsProps.buttons.verify}
              </Button>
            )}

            {currentFormStep === "verification" && isEmailVerified && (
              <Button
                tint="yellow"
                variant="solid"
                type="button"
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
                onClick={onSubmitAdditionalDetails}
              >
                {personalDetailsProps.buttons.continue}
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
