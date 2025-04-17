import { z } from "zod";

const addressSchema = z.object({
  line1: z.string().min(1, "Address line 1 is required"),
  line2: z.string().optional(),
  line3: z.string().optional(),
  postcode: z.string().min(1, "Postcode is required"),
  addressKey: z.string().min(1, "Address key is required"),
  addressKeyType: z.string().min(1, "Address key type is required"),
  naduprn: z.string().optional(),
});

export const packageSelectionSchema = z.object({
  packageId: z.string().min(1, "Please select a package"),
  serviceAddress: addressSchema,
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

export type PackageSelectionFormValues = z.infer<typeof packageSelectionSchema>;
export type EeroSelectionFormValues = z.infer<typeof eeroSelectionSchema>;
export type GoLiveDateFormValues = z.infer<typeof goLiveDateSchema>;
