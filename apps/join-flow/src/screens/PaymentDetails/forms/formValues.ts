import { z } from "zod";

export const paymentFormSchema = z.object({
  accountholderName: z
    .string()
    .min(1, "Account holder name is required")
    .max(100, "Account holder name cannot exceed 100 characters"),
  accountNumber: z.string().regex(/^\d{8}$/, "Account number must be 8 digits"),
  sortCode: z
    .string()
    .regex(/^\d{2}-\d{2}-\d{2}$/, "Sort code must be in format XX-XX-XX"),
  sameAsServiceAddress: z.boolean(),
  isAccountHolder: z.boolean().refine((val) => val === true, {
    message: "You must confirm that you are the account holder",
  }),
});
export interface PaymentFormValues {
  accountholderName: string;
  accountNumber: string;
  sortCode: string;
  sameAsServiceAddress: boolean;
  isAccountHolder: boolean;
}

export type FormValues = z.infer<typeof paymentFormSchema>;
