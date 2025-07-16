import { z } from "zod";

const PERSONAL_NAME_PATTERN = /^[\p{L}\s'-]+$/u;

export const addressSchema = z.object({
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().min(1, "Address line 2 is required"),
  line3: z.string().min(1, "Address line 3 is required"),
  postcode: z.string().min(1, "Postcode is required"),
  identifiers: z.array(
    z.object({
      value: z.string(),
      scheme: z.string(),
      id: z.string(),
    }),
  ),
});

export const packageSelectionSchema = z.object({
  packageId: z.string().min(1, "Please select a package"),
  serviceAddress: addressSchema,
});

export const eeroSelectionSchema = z.object({
  code: z.string(),
  family: z.string(),
  selectionIdentifier: z.string().min(1, "Please select an eero product"),
  price: z.number(),
});

export const expressionOfInterestSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Name is too long")
    .regex(
      PERSONAL_NAME_PATTERN,
      "Name can only contain letters, spaces, apostrophes, and hyphens",
    ),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long")
    .max(254, "Email must be 254 characters long or fewer"),
  phoneNumber: z
    .string()
    .optional()
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
});

export const notReadyToJoinSchema = expressionOfInterestSchema.extend({
  selectedDate: z.string().min(1, "Please select a date"),
});

export const goLiveDateSchema = z.object({
  selectedDate: z.string().min(1, "Please select a date"),
  timeSlot: z.string().optional(),
});

export const accessibilityRequirementsSchema = z
  .object({
    blindVisionImpaired: z.boolean().optional(),
    deafOrHardOfHearing: z.boolean().optional(),
    neurodivergent: z.boolean().optional(),
    learningDisability: z.boolean().optional(),
    thirdPartyAssistance: z.boolean().optional(),
    thirdPartyName: z.string().optional(),
    thirdPartyPhone: z.string().optional(),
    thirdPartyEmail: z.string().optional(),
    physicalIllness: z.boolean().optional(),
    physicalDisability: z.boolean().optional(),
    communicationDifficulties: z.boolean().optional(),
    otherIllness: z.boolean().optional(),
    additionalInformation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.thirdPartyAssistance) {
      if (!data.thirdPartyName || data.thirdPartyName.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide a name",
          path: ["thirdPartyName"],
        });
      }

      if (!data.thirdPartyEmail || data.thirdPartyEmail.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide an email address",
          path: ["thirdPartyEmail"],
        });
      } else {
        const emailValidation = z
          .string()
          .email()
          .safeParse(data.thirdPartyEmail);
        if (!emailValidation.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please enter a valid email address",
            path: ["thirdPartyEmail"],
          });
        }
      }
    }
  });

export const accessibilityCommunicationPreferencesSchema = z
  .object({
    contentTypes: z.object({
      monthlyBills: z.boolean().optional(),
      cics: z.boolean().optional(),
      termsAndConditions: z.boolean().optional(),
    }),
    contactPreferences: z.object({
      audio: z.boolean().optional(),
      braille: z.boolean().optional(),
      largePrint: z.boolean().optional(),
    }),
  })
  .superRefine((data, ctx) => {
    const selectedPreferences = Object.values(data.contactPreferences).filter(
      Boolean,
    );
    const selectedContentTypes = Object.values(data.contentTypes).filter(
      Boolean,
    );

    if (selectedPreferences.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select a format",
        path: ["contactPreferences"],
      });
    }

    if (selectedContentTypes.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select at least one document",
        path: ["contentTypes"],
      });
    }
  });

export type AccessibilityCommunicationPreferencesFormData = z.infer<
  typeof accessibilityCommunicationPreferencesSchema
>;

export type AccessibilityRequirementsFormData = z.infer<
  typeof accessibilityRequirementsSchema
>;
export type GoLiveDateFormValues = z.infer<typeof goLiveDateSchema>;

export type ExpressionOfInterestFormData = z.infer<
  typeof expressionOfInterestSchema
>;

export type NotReadyToJoinFormData = z.infer<typeof notReadyToJoinSchema>;
