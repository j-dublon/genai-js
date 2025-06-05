import { BroadbandProvider } from "@store/useJoinFlowStore";
import * as z from "zod";

// Update schema with custom error message
export const oneTouchSwitchingSchema = z.object({
  provider: z
    .string({
      required_error: "Please select a provider from the list",
    })
    .min(1, "Please select a provider from the list"),
  consentGiven: z.boolean().refine((val) => val === true, {
    message:
      "Please confirm you're the accountholder and consent to the switch",
  }),
  accountNumber: z.string().optional(),
});

export type OneTouchSwitchingFormData = z.infer<typeof oneTouchSwitchingSchema>;

export type MatchResultType = {
  success: boolean;
  message: string;
  provider?: BroadbandProvider;
};

export type OneTouchSwitchingFormProps = {
  onSubmit: (data: OneTouchSwitchingFormData) => Promise<void>;
  defaultProvider?: string;
  matchResult: MatchResultType | null;
  setMatchResult: (result: MatchResultType | null) => void;
  isSubmitting?: boolean;
};

export const accountNumberSchema = z
  .string()
  .min(1, "Account number is required")
  .max(30, "Account number is too long");
