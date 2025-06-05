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

export type PackageSelectionFormValues = z.infer<typeof packageSelectionSchema>;
export type EeroSelectionFormValues = z.infer<typeof eeroSelectionSchema>;
export type GoLiveDateFormValues = z.infer<typeof goLiveDateSchema>;
