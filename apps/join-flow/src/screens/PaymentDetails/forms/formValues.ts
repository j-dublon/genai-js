import { z } from "zod";

export const paymentFormSchema = z.object({
  accountholderName: z.string().min(1, "Account holder name is required"),
  accountNumber: z
    .string()
    .regex(/^\d{8}$/, "Valid 8-digit account number is required"),
  sortCode: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{2}$/, "Valid sort code (xx-xx-xx) is required"),
  sameAsServiceAddress: z.boolean().optional(),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;
