import { z } from "zod";

// This can be expanded but is only really necessary to satisfy TS in certain scenarios
export const DevelopmentEnvironmentSchema = z.object({
  NEXT_PUBLIC_POSTHOG_KEY: z.string(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string(),
});
