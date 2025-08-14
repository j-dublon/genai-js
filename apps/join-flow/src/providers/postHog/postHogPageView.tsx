"use client";

import { useCookieNotice } from "@react-component-library/ui";
import { usePathname } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { Suspense, useEffect } from "react";

import {
  captureJoinFlowEvent,
  getSubFeatureFromPath,
} from "@/tracking/posthogUtilWrappers";

function PostHogPageView(): null {
  const posthog = usePostHog();
  const cookieNotice = useCookieNotice();
  const pathname = usePathname();

  useEffect(() => {
    // https://posthog.com/tutorials/nextjs-cookie-banner#adding-the-opt-in-and-out-logic
    posthog[
      cookieNotice?.choices?.analytics_storage === "granted"
        ? "opt_in_capturing"
        : "opt_out_capturing"
    ]();
  }, [cookieNotice?.choices?.analytics_storage, posthog]);

  useEffect(() => {
    const subFeature = getSubFeatureFromPath(pathname);

    captureJoinFlowEvent("$pageview", {
      subFeature,
      outcome: "success",
      type: "display",
    });
  }, [pathname]);

  return null;
}

// Wrap this in Suspense to avoid the `useSearchParams` usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
export default function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
