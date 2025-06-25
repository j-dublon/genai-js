import { z } from "zod";

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
  id: z.string().min(1, "Please select an eero product"),
  name: z.string(),
  price: z.number(),
  isSelected: z.boolean().optional(),
  heading: z.string().min(1, "Heading is required"),
  description: z.string(),
  totalCount: z.number().int(),
  imageURL: z.string(),
});

export const notReadyToJoinSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  selectedDate: z.string().min(1, "Please select a date"),
});

export const goLiveDateSchema = z.object({
  selectedDate: z.string().min(1, "Please select a date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
});

export const accessibilityRequirementsSchema = z
  .object({
    visionImpaired: z.boolean().optional(),
    hearingImpaired: z.boolean().optional(),
    neurodiverse: z.boolean().optional(),
    learningDisability: z.boolean().optional(),
    thirdPartyAssistance: z.boolean().optional(),
    thirdPartyName: z.string().optional(),
    thirdPartyPhone: z.string().optional(),
    thirdPartyEmail: z.string().optional(),
    physicalIllness: z.boolean().optional(),
    physicalDisability: z.boolean().optional(),
    communicationNeeds: z.boolean().optional(),
    mentalIllness: z.boolean().optional(),
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
    contentTypes: z
      .object({
        monthlyBills: z.boolean().optional(),
        cics: z.boolean().optional(),
        termsAndConditions: z.boolean().optional(),
      })
      .optional(),
    contactPreferences: z
      .object({
        audio: z.boolean().optional(),
        braille: z.boolean().optional(),
        largePrint: z.boolean().optional(),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    const selectedPreferences = Object.values(
      data?.contactPreferences || {},
    ).filter((value) => value === true);

    // If a format is selected, at least one document must be selected
    if (selectedPreferences.length > 0) {
      const selectedContentTypes = Object.values(
        data?.contentTypes || {},
      ).filter((value) => value === true);

      if (selectedContentTypes.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select at least one document",
          path: ["contentTypes"],
        });
      }
    }

    // If a document is selected, one format must also be selected
    const selectedContentTypes = Object.values(data?.contentTypes || {}).filter(
      (value) => value === true,
    );

    if (selectedContentTypes.length > 0 && selectedPreferences.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select a format",
        path: ["contactPreferences"],
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
