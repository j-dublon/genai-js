"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@react-component-library/ui";
import useJoinFlowStore from "@store/useJoinFlowStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormInput from "@/components/atoms/FormInput";
import Stepper from "@/components/molecules/Stepper";

import { personalDetailsProps } from "./personalDetailsProps";

const createPersonalDetailsSchema = (props: typeof personalDetailsProps) => {
  return z
    .object({
      firstName: z.string().min(1, props.validationMessages.firstNameRequired),
      lastName: z.string().min(1, props.validationMessages.lastNameRequired),
      phone: z.string().min(1, props.validationMessages.phoneRequired),
      hasSmartphone: z
        .string({
          required_error: props.validationMessages.smartphoneConfirmation,
          invalid_type_error: props.validationMessages.smartphoneConfirmation,
        })
        .refine((val) => val === "yes" || val === "no", {
          message: props.validationMessages.smartphoneConfirmation,
        }),
      email: z.string().email(props.validationMessages.emailInvalid),
      confirmEmail: z
        .string()
        .email(props.validationMessages.emailConfirmation),
      marketingConsent: z.boolean().optional(),
    })
    .refine((data) => data.email === data.confirmEmail, {
      message: props.validationMessages.emailsMustMatch,
      path: ["confirmEmail"],
    });
};

type FormValues = z.infer<ReturnType<typeof createPersonalDetailsSchema>>;

const PersonalDetails = () => {
  const router = useRouter();
  const { setPersonalDetails, personalDetails, setCurrentStep } =
    useJoinFlowStore();

  const personalDetailsSchema =
    createPersonalDetailsSchema(personalDetailsProps);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      firstName: personalDetails?.firstName || "",
      lastName: personalDetails?.lastName || "",
      phone: personalDetails?.phone || "",
      hasSmartphone: (personalDetails?.hasSmartphone as "yes" | "no") || "",
      email: personalDetails?.email || "",
      confirmEmail: personalDetails?.confirmEmail || "",
      marketingConsent:
        typeof personalDetails?.marketingConsent === "boolean"
          ? personalDetails.marketingConsent
          : false,
    },
  });

  const hasSmartphoneValue = watch("hasSmartphone");

  useEffect(() => {
    if (hasSmartphoneValue === "no") {
      alert(personalDetailsProps.smartphoneSection.noSmartphoneAlertText);
    }
  }, [hasSmartphoneValue]);

  const onSubmit = (data: FormValues) => {
    setPersonalDetails({
      ...data,
    });

    setCurrentStep(2);
    router.push("/join-flow/eero-selection");
  };

  const handleBack = () => {
    setCurrentStep(0);
    router.push("/join-flow");
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
          className="text-core-purple underline hover:text-core-purple-dark cursor-pointer"
          style={{ transition: "color 0.2s ease" }}
        >
          {personalDetailsProps.marketingSection.privacyNoticeText}
        </a>
        {parts[1]}
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Stepper />

      <div className="max-w-2xl mx-auto p-8 rounded-lg">
        <h1 className="text-2xl text-center font-bold mb-6">
          {personalDetailsProps.pageTitle}
        </h1>
        <h2 className="text-md font-bold mb-6">
          {personalDetailsProps.sectionTitle}
        </h2>
        <p className="text-md mb-4">
          {personalDetailsProps.requiredFieldsText}
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FormInput
              id="firstName"
              placeholder={personalDetailsProps.fieldPlaceholders.firstName}
              error={errors.firstName}
              {...register("firstName")}
            />

            <FormInput
              id="lastName"
              placeholder={personalDetailsProps.fieldPlaceholders.lastName}
              error={errors.lastName}
              {...register("lastName")}
            />
          </div>
          <div className="mb-6">
            <FormInput
              id="phone"
              type="tel"
              placeholder={personalDetailsProps.fieldPlaceholders.phone}
              error={errors.phone}
              {...register("phone")}
            />
          </div>
          <div className="mb-6">
            <p className="text-md mb-4">
              {personalDetailsProps.smartphoneSection.mainText}
              <span className="text-core-purple">
                {" "}
                {personalDetailsProps.smartphoneSection.whyText}
              </span>
            </p>
            <div className="flex flex-col gap-2">
              {personalDetailsProps.smartphoneSection.options.map((option) => (
                <label key={option.value} className="inline-flex items-center">
                  <input
                    type="radio"
                    value={option.value}
                    {...register("hasSmartphone")}
                    className="mr-2"
                  />
                  {option.label}
                </label>
              ))}
            </div>
            {errors.hasSmartphone && (
              <p className="text-core-red text-sm mt-1">
                {errors.hasSmartphone.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <FormInput
              id="email"
              type="email"
              placeholder={personalDetailsProps.fieldPlaceholders.email}
              error={errors.email}
              {...register("email")}
            />
          </div>
          <div className="mb-6">
            <FormInput
              id="confirmEmail"
              type="email"
              placeholder={personalDetailsProps.fieldPlaceholders.confirmEmail}
              error={errors.confirmEmail}
              {...register("confirmEmail")}
            />
          </div>
          <div className="mb-4">{renderMarketingText()}</div>

          <div className="mb-6">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2 h-5 w-5 cursor-pointer"
                {...register("marketingConsent")}
              />
              <span>{personalDetailsProps.marketingSection.consentText}</span>
            </label>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              onClick={handleBack}
              tint="white"
              variant="outline"
              type="button"
            >
              {personalDetailsProps.buttons.back}
            </Button>

            <Button tint="yellow" variant="solid" type="submit">
              {personalDetailsProps.buttons.continue}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
