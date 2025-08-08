import { BroadbandProvider, OTSSwitchStatus } from "@store/useJoinFlowStore";
import * as z from "zod";

// Base schema
const baseOneTouchSwitchingSchema = z.object({
  provider: z
    .string({ required_error: "Please select a provider from the list" })
    .min(1, "Please select a provider from the list"),
  consentGiven: z.boolean().refine((val) => val === true, {
    message:
      "Please confirm you're the account holder and consent to the switch",
  }),
});

export const createOneTouchSwitchingSchema = (
  otsSwitchStatus?: OTSSwitchStatus,
) => {
  const isSecondAttempt = otsSwitchStatus === "FIRST_ATTEMPT_FAILED";

  return baseOneTouchSwitchingSchema.extend({
    accountNumber: isSecondAttempt
      ? z.string().min(1, "Account number is required for verification")
      : z.string().optional(),
  });
};

export const oneTouchSwitchingSchema = baseOneTouchSwitchingSchema.extend({
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
  matchResult?: MatchResultType | null;
  setMatchResult: (result: MatchResultType | null) => void;
  isSubmitting?: boolean;
  providers: BroadbandProvider[];
  providerError: boolean;
  isLoadingProviders: boolean;
};

export const accountNumberSchema = z
  .string()
  .min(1, "Account number is required")
  .max(30, "Account number is too long");
