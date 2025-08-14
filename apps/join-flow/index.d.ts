import { PostHog } from "posthog-js";
import { z } from "zod";
import { DevelopmentEnvironmentSchema } from "./src/validation/environmentSchema";

declare global {
  interface Window {
    /**
     * Exposed within [`PosthogProvider`](./src/providers/postHog/PostHogProvider.tsx) for
     * internal use. The util-squid-network-requests package needs access to this for tracking purposes.
     *
     * @example
     * $$POSTHOG.identify("your-name@cuckoo.co")
     */
    $$POSTHOG?: PostHog;
  }

  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends z.infer<typeof DevelopmentEnvironmentSchema> {}
  }
}
