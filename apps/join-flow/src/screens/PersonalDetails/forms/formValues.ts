import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { z } from "zod";

import { ModalContent } from "@/components/ModalContent";
import { PersonalDetails, StoreAddress } from "@/store/useJoinFlowStore";

import { personalDetailsProps } from "../personalDetailsProps";
const PERSONAL_NAME_PATTERN = /^[\p{L}\s'-]+$/u;

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
    isVerified: z.boolean().optional(),
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
    requiresLandline: z.boolean().optional(),
  });

  if (step === "details") {
    return baseSchema
      .extend({
        firstName: z
          .string()
          .min(1, props.validationMessages.firstNameRequired)
          .max(50, props.validationMessages.firstNameLengthTooLong)
          .regex(
            RegExp(PERSONAL_NAME_PATTERN),
            props.validationMessages.firstNameInvalid,
          ),
        lastName: z
          .string()
          .min(1, props.validationMessages.lastNameRequired)
          .max(50, props.validationMessages.lastNameLengthTooLong)
          .regex(
            RegExp(PERSONAL_NAME_PATTERN),
            props.validationMessages.lastNameInvalid,
          ),
        phone: z
          .string()
          .refine((val) => !val || /^[\d\s().-]*$/.test(val), {
            message: "Please enter only digits for your phone number",
          })
          .transform((val) => val?.replace(/\D/g, ""))
          .refine((val) => !val || val.length === 11, {
            message: "UK mobile number must be 11 digits",
          })
          .refine((val) => !val || /^07\d{9}$/.test(val || ""), {
            message: "Please enter a valid UK mobile phone number",
          }),

        hasSmartphone: z.enum(["yes", "no"], {
          message: props.validationMessages.smartphoneConfirmation, // invalid_type_error doesn't handle enum errors as you'd expect (https://github.com/colinhacks/zod/issues/2919)
        }),
        email: z
          .string()
          .min(5, props.validationMessages.emailLengthTooShort)
          .max(254, props.validationMessages.emailLengthTooLong)
          .email(props.validationMessages.emailInvalid),
        confirmEmail: z
          .string()
          .min(5, props.validationMessages.emailLengthTooShort)
          .max(254, props.validationMessages.emailLengthTooLong)
          .email(props.validationMessages.emailConfirmation),
      })
      .refine((data) => data.email === data.confirmEmail, {
        message: props.validationMessages.emailsMustMatch,
        path: ["confirmEmail"],
      });
  } else if (step === "additional") {
    return baseSchema
      .extend({
        dobDay: z
          .string()
          .min(1, "Day is required")
          .refine(
            (val) => {
              const num = Number(val);
              return !isNaN(num) && num >= 1 && num <= 31;
            },
            {
              message: "Day must be between 1 and 31",
            },
          ),
        dobMonth: z
          .string()
          .min(1, "Month is required")
          .refine(
            (val) => {
              const num = Number(val);
              return !isNaN(num) && num >= 1 && num <= 12;
            },
            {
              message: "Month must be between 1 and 12",
            },
          ),
        dobYear: z
          .string()
          .min(4, "Year is required")
          .refine(
            (val) => {
              const num = Number(val);
              return (
                !isNaN(num) && num > 1900 && num <= new Date().getFullYear()
              );
            },
            { message: "Enter a valid year" },
          ),
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
      })
      .superRefine((values, ctx) => {
        const day = Number(values.dobDay);
        const month = Number(values.dobMonth);
        const year = Number(values.dobYear);

        if (
          !isNaN(day) &&
          day >= 1 &&
          day <= 31 &&
          !isNaN(month) &&
          month >= 1 &&
          month <= 12 &&
          !isNaN(year) &&
          year > 1900 &&
          year <= new Date().getFullYear()
        ) {
          const dob = new Date(year, month - 1, day);
          const today = new Date();
          const eighteenYearsAgo = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate(),
          );
          if (dob > eighteenYearsAgo) {
            ["dobDay", "dobMonth", "dobYear"].forEach((field) =>
              ctx.addIssue({
                path: [field],
                message: "You must be at least 18 years old",
                code: z.ZodIssueCode.custom,
              }),
            );
          }
        }
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
  control: Control<PersonalDetails>;
  hasSubmitted: boolean;
};

export type AdditionalPersonalDetailsFormProps = {
  register: UseFormRegister<PersonalDetails>;
  errors: FieldErrors<PersonalDetails>;
  address: StoreAddress | null;
  requiresLandline: boolean;
  control: Control<PersonalDetails>;
  hasSubmitted: boolean;
  personalDetailsProps: {
    additionalSection: {
      dobTitle: string;
      dobDayPlaceholder: string;
      dobMonthPlaceholder: string;
      dobYearPlaceholder: string;
      dobLink: string;
      addressTitle: string;
      residencyOptions: Array<{
        value: string;
        label: string;
      }>;
      landlineTitle: string;
      landlineText: string;
      landlineTextLink: string;
      landlineCheckboxText: string;
      dobModalTitle: string;
      dobModal: ModalContent[];
      modalCloseText: string;
      teleHealthDeviceModalTitle: string;
      teleHealthDeviceModal: ModalContent[];
    };
  };
};

type verificationSection = {
  title: string;
  description: string;
  inputLabelText: string;
  tipCardText: string;
  invalidCodeText?: string;
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
  verificationSection: verificationSection;
  buttons?: {
    back: string;
    continue: string;
    verify: string;
  };
  pageTitle?: string;
  sectionTitle?: string;
  requiredFieldsText?: string;
  smartphoneModalDetails: {
    modalTitle: string;
    modalContent: ModalContent[];
  };
  emailModalDetails: {
    modalTitle: string;
    modalContent: ModalContent[];
  };
};

export type EmailVerificationFormProps = {
  register: UseFormRegister<PersonalDetails>;
  errors: FieldErrors<PersonalDetails>;
  verificationSection: verificationSection;
  isCodeValid?: boolean;
  isVerified?: boolean;
  onVerificationSuccess?: () => void;
  onEmailChanged?: () => void;
  currentEmail?: string;
  previousEmail?: string;
  handleCodeChange: (arg1: string, arg2: number) => void;
  validateCode: (code: string) => void;
  handleBack: () => void;
  handleResendCode: () => Promise<void>;
  userVerificationErrorMessage?: string;
};
