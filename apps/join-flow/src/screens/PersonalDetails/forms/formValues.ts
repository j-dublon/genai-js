import { JSX } from "react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";

import { PersonalDetails } from "@/store/useJoinFlowStore";

import { personalDetailsProps } from "../personalDetailsProps";

export const createStepBasedPersonalDetailsSchema = (
  props: typeof personalDetailsProps,
  step: "details" | "verification" | "additional",
) => {
  const baseSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    hasSmartphone: z.enum(["yes", "no"]).optional(),
    email: z.string().optional(),
    confirmEmail: z.string().optional(),
    marketingConsent: z.boolean().optional(),
    verificationCode: z.string().optional(),
    dobDay: z.string().optional(),
    dobMonth: z.string().optional(),
    dobYear: z.string().optional(),
    residencyDuration: z
      .enum(["over-year", "under-year"])
      .nullable()
      .optional(),
    personalDetailsStep: z
      .enum(["details", "verification", "additional"])
      .optional(),
    personalDetailsCompleted: z.boolean().optional(),
  });

  if (step === "details") {
    return baseSchema
      .extend({
        firstName: z
          .string()
          .min(1, props.validationMessages.firstNameRequired),
        lastName: z.string().min(1, props.validationMessages.lastNameRequired),
        phone: z.string().min(1, props.validationMessages.phoneRequired),
        hasSmartphone: z.enum(["yes", "no"], {
          required_error: props.validationMessages.smartphoneConfirmation,
          invalid_type_error: props.validationMessages.smartphoneConfirmation,
        }),
        email: z.string().email(props.validationMessages.emailInvalid),
        confirmEmail: z
          .string()
          .email(props.validationMessages.emailConfirmation),
      })
      .refine((data) => data.email === data.confirmEmail, {
        message: props.validationMessages.emailsMustMatch,
        path: ["confirmEmail"],
      });
  } else if (step === "verification") {
    return baseSchema.extend({
      verificationCode: z.string().min(6, "Verification code is required"),
    });
  } else if (step === "additional") {
    return baseSchema.extend({
      dobDay: z.string().min(1, "Day is required"),
      dobMonth: z.string().min(1, "Month is required"),
      dobYear: z.string().min(1, "Year is required"),
      residencyDuration: z
        .enum(["over-year", "under-year"], {
          required_error: props.validationMessages.residencyDurationRequired,
          invalid_type_error:
            props.validationMessages.residencyDurationRequired,
        })
        .nullable()
        .refine((val) => val !== null, {
          message: props.validationMessages.residencyDurationRequired,
        }),
    });
  }

  return baseSchema;
};

export type FormStepValues = z.infer<
  ReturnType<typeof createStepBasedPersonalDetailsSchema>
>;

export type SmartphoneOption = {
  value: string;
  label: string;
};

export type InitialPersonalDetailsProps = {
  register: UseFormRegister<PersonalDetails>;
  errors: FieldErrors<PersonalDetails>;
  hasSmartphoneValue: string;
  personalDetailsProps: PersonalDetailsUIConfig;
  renderMarketingText: () => JSX.Element;
};

export type AdditionalPersonalDetailsFormProps = {
  register: UseFormRegister<PersonalDetails>;
  errors: FieldErrors<PersonalDetails>;
  personalDetailsProps: {
    additionalSection: {
      dobTitle: string;
      dobDayPlaceholder: string;
      dobMonthPlaceholder: string;
      dobYearPlaceholder: string;
      addressTitle: string;
      residencyOptions: Array<{
        value: string;
        label: string;
      }>;
    };
  };
};

export type PersonalDetailsUIConfig = {
  fieldPlaceholders: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    confirmEmail: string;
  };
  smartphoneSection: {
    mainText: string;
    whyText: string;
    options: SmartphoneOption[];
  };
  marketingSection: {
    consentText: string;
    text?: string;
    privacyNoticeUrl?: string;
    privacyNoticeText?: string;
  };
  validationMessages: {
    firstNameRequired: string;
    lastNameRequired: string;
    phoneRequired: string;
    smartphoneConfirmation: string;
    emailInvalid: string;
    emailConfirmation: string;
    emailsMustMatch: string;
    residencyDurationRequired: string;
  };
  verificationSection: {
    title: string;
    description: string;
    codePlaceholder: string;
    invalidCodeText?: string;
  };
  buttons?: {
    back: string;
    continue: string;
    verify: string;
  };
  pageTitle?: string;
  sectionTitle?: string;
  requiredFieldsText?: string;
};

export type EmailVerificationFormProps = {
  register: UseFormRegister<PersonalDetails>;
  errors: FieldErrors<PersonalDetails>;
  personalDetailsProps: {
    verificationSection: {
      title: string;
      description: string;
      codePlaceholder: string;
      invalidCodeText?: string;
    };
  };
  isVerified?: boolean;
  onVerificationSuccess?: () => void;
  onEmailChanged?: () => void;
  currentEmail?: string;
  previousEmail?: string;
};
