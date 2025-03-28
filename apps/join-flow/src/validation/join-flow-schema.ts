import { z } from "zod";

export const packageSelectionSchema = z.object({
  packageId: z.string().min(1, "Please select a package"),
});

const addressSchema = z.object({
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  line3: z.string().optional(),
  postcode: z.string().min(1, "Postcode is required"),
  addressKey: z.string().min(1, "Address key is required"),
  addressKeyType: z.string().min(1, "Address key type is required"),
  naduprn: z.string().optional(),
});

export const eeroSelectionSchema = z.object({
  id: z.string().min(1, "Please select an eero product"),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  isSelected: z.boolean().optional(),
});

export const goLiveDateSchema = z.object({
  selectedDate: z.string().min(1, "Please select a date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
});

export const paymentDetailsSchema = z.object({
  accountholderName: z.string().min(1, "Account holder name is required"),
  cardToken: z.string().min(1, "Token is required"),
  accountNumber: z
    .string()
    .regex(/^\d{8}$/, "Valid 8-digit account number is required")
    .optional(),
  sortCode: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{2}$/, "Valid sort code (xx-xx-xx) is required")
    .optional(),
  sameAsServiceAddress: z.boolean().optional(),
  billingAddress: addressSchema.nullable().optional(),
  termsAgreed: z.boolean().default(false),
  directDebitAgreed: z.boolean().default(false),
  creditSearchAgreed: z.boolean().default(false),
  allTermsAgreed: z.boolean().default(false),
});

export const personalDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(1, "Phone number is required"),
  address: z
    .object({
      line1: z.string().min(1, "Address line 1 is required"),
      postcode: z.string().min(1, "Postcode is required"),
      addressKey: z.string().min(1, "Address key is required"),
      addressKeyType: z.string().min(1, "Address key type is required"),
    })
    .nullable(),
});

export type PackageSelectionFormValues = z.infer<typeof packageSelectionSchema>;
export type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;
export type PaymentDetailsFormValues = z.infer<typeof paymentDetailsSchema>;
export type EeroSelectionFormValues = z.infer<typeof eeroSelectionSchema>;
export type GoLiveDateFormValues = z.infer<typeof goLiveDateSchema>;
