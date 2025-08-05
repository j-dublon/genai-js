"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ColorPill, LoadingModal } from "@react-component-library/ui";
import { TickWithCircle } from "@react-component-library/ui/icons";
import useJoinFlowStore, {
  type PersonalDetails,
} from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Footer } from "@/components/Footer";
import { StepNavigationWithBasket } from "@/components/StepNavigationWithBasket";
import { useLoadingModal } from "@/hooks/useLoadingModal";
import {
  PILL_FADE_OUT_DELAY,
  PILL_HIDE_DELAY,
  VALIDATION_CODE_LENGTH,
} from "@/lib/constants";
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
import { personalDetailsProps, slides } from "./personalDetailsProps";

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
    isLoadingModalOpen,
    setIsLoadingModalOpen,
    setErrorInfo,
  } = useJoinFlowStore();
  const { loadingModalRef, slidesWithAssetPath } = useLoadingModal({
    isLoadingModalOpen,
    slides,
  });
  const [emailCodeLoading, setEmailCodeLoading] = useState<boolean>(false);

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
  const [validationAttempts, setValidationAttempts] = useState(0);

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

  const [showPill, setShowPill] = useState<boolean>(true);
  const [fadeOut, setFadeOut] = useState<boolean>(false);

  const getStepSchema = () => {
    return createStepBasedPersonalDetailsSchema(
      personalDetailsProps,
      currentFormStep,
    ) as z.ZodType<PersonalDetails>;
  };

  const validateCode = async (code: string) => {
    if (!basket) {
      setErrorInfo({ type: "basketError" });
      router.push("/join-flow/error");
      return;
    }

    const response = await validateEmailCode(basket.id, code);

    if (response.error) {
      const errorType = response.error.type;
      if (errorType === "invalidCode") {
        setEmailCodeErrorMessage(
          personalDetailsProps.verificationSection.invalidCodeText,
        );
        setIsEmailCodeValid(false);
        setValidationAttempts((prev) => prev + 1);
        return;
      }
      setErrorInfo({ type: errorType });
      router.push("/join-flow/error");
      return;
    }

    if (response.success) {
      setIsEmailCodeValid(true);
      setEmailCodeErrorMessage(undefined);
    } else {
      setIsEmailCodeValid(false);
      setValidationAttempts((prev) => prev + 1);
    }
  };

  const handleCodeChange = async (value: string, index: number) => {
    if (value.length === VALIDATION_CODE_LENGTH) {
      if (isEmailCodeValid !== true) {
        setEmailCodeLoading(true);
        await validateCode(value);
        setEmailCodeLoading(false);
      }
      return;
    }

    const newCode = [...validationCode];
    newCode[index] = value;

    if (value.length <= 1) {
      setValidationCode(newCode);

      if (newCode.every((digit) => digit !== "")) {
        const code = newCode.join("");
        if (
          code.length === VALIDATION_CODE_LENGTH &&
          isEmailCodeValid !== true
        ) {
          setEmailCodeLoading(true);
          await validateCode(code);
          setEmailCodeLoading(false);
        }
      }
    }
  };

  const handleSendCode = async () => {
    if (!isEmailVerified) {
      if (!basket) {
        setErrorInfo({ type: "basketError" });
        router.push("/join-flow/error");
        return;
      }
      setIsEmailCodeValid(undefined);
      setEmailCodeErrorMessage(undefined);

      const response = await sendEmailCode(basket.id);

      if (response.error) {
        const errorType = response.error.type;
        if (
          errorType === "emailCodeTooRecent" ||
          errorType === "emailCodeSpam"
        ) {
          setEmailCodeErrorMessage(
            personalDetailsProps.verificationSection.tooRecentRequestText,
          );
          return;
        }
        setErrorInfo({ type: errorType });
        router.push("/join-flow/error");
        return;
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
      addressHistory: Array.isArray(personalDetails?.addressHistory)
        ? personalDetails.addressHistory
        : [],
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
        addressHistory: Array.isArray(personalDetails?.addressHistory)
          ? personalDetails.addressHistory
          : [],
      },
      {
        keepValues: true,
        keepDefaultValues: true,
        keepDirty: false,
      },
    );

    setShowPill(true);
    setFadeOut(false);

    const fadeOuttimer = setTimeout(
      () => setFadeOut(true),
      PILL_FADE_OUT_DELAY,
    );
    const hidePillTimer = setTimeout(() => setShowPill(false), PILL_HIDE_DELAY);

    return () => {
      clearTimeout(fadeOuttimer);
      clearTimeout(hidePillTimer);
    };
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
        addressHistory: formValues.addressHistory,
      } as PersonalDetails;

      try {
        if (!basket) {
          setErrorInfo({ type: "basketError" });
          router.push("/join-flow/error");
          return;
        }
        setIsLoadingModalOpen(true);
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
          setErrorInfo({ type: result.error.type });
          router.push("/join-flow/error");
          return;
        }
      } catch {
        setErrorInfo({ type: "unknownError" });
        router.push("/join-flow/error");
        return;
      }

      await handleSendCode();

      setPersonalDetails(updatedDetails);
      setCurrentFormStep(nextStep);
      setIsLoadingModalOpen(false);
    } catch (error) {
      console.log(error);
      setIsLoadingModalOpen(false);
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
    const formValues = getValues();

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

    const updatedAddressHistory = [];
    if (serviceAddress) {
      updatedAddressHistory.push({
        line1: serviceAddress.line1,
        line2: serviceAddress.line2,
        line3: serviceAddress.line3,
        postcode: serviceAddress.postcode,
      });
    }
    if (
      residencyDuration === "under-year" &&
      formValues.addressHistory &&
      Array.isArray(formValues.addressHistory)
    ) {
      formValues.addressHistory.slice(1).forEach((address) => {
        if (
          address &&
          (address.line1 || address.line2 || address.line3 || address.postcode)
        ) {
          updatedAddressHistory.push(address);
        }
      });
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
      addressHistory:
        updatedAddressHistory.length > 0 ? updatedAddressHistory : null,
    } as PersonalDetails;

    setPersonalDetails(updatedDetails);
    setCurrentStep(2);

    try {
      if (!basket) {
        setErrorInfo({ type: "basketError" });
        router.push("/join-flow/error");
        return;
      }

      setIsLoadingModalOpen(true);

      const updatedAddressHistoryForBasket = [];

      if (serviceAddress) {
        updatedAddressHistoryForBasket.push({
          line1: serviceAddress.line1 || null,
          line2: serviceAddress.line2 || null,
          line3: serviceAddress.line3 || null,
          postcode: serviceAddress.postcode || null,
          id: null,
        });
      }

      if (
        residencyDuration === "under-year" &&
        formValues.addressHistory &&
        Array.isArray(formValues.addressHistory)
      ) {
        formValues.addressHistory.slice(1).forEach((address) => {
          if (
            address &&
            (address.line1 ||
              address.line2 ||
              address.line3 ||
              address.postcode)
          ) {
            updatedAddressHistoryForBasket.push({
              line1: address.line1 || null,
              line2: address.line2 || null,
              line3: address.line3 || null,
              postcode: address.postcode || null,
              id: null,
            });
          }
        });
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
        addressHistory: updatedAddressHistoryForBasket,
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
            router.push("/join-flow/personal-details/retry-check");
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
          setIsLoadingModalOpen(false);
          break;
      }
    } catch {
      setErrorInfo({ type: "unknownError" });
      router.push("/join-flow/error");
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
      <LoadingModal
        modalRef={loadingModalRef}
        slides={slidesWithAssetPath}
        loading={isLoadingModalOpen}
      />
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-[569px] mx-auto rounded-lg">
          {showPill && (
            <div className="flex justify-center mb-6">
              <ColorPill
                colorPillText={
                  {
                    details: "Plan added to your basket",
                    verification: "We've added your details",
                    additional: "We've validated your email",
                  }[currentFormStep]
                }
                backgroundColor="offer-gradient"
                size="small"
                icon={
                  <TickWithCircle
                    minY={-1}
                    height={24}
                    circleFill="none"
                    tickFill="black"
                  />
                }
                className={`px-4 pt-2 pb-2.5 transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"}`}
              />
            </div>
          )}

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
              emailCodeLoading={emailCodeLoading}
              setEmailCodeLoading={setEmailCodeLoading}
              validationAttempts={validationAttempts}
            />
          )}

          {currentFormStep === "additional" && (
            <AdditionalFormComponent
              register={register}
              errors={errors}
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
