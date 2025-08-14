import {
  type EventProperties,
  posthogBrowserCaptureEvent as squidPosthogBrowserCaptureEvent,
} from "@cuckoointernet/util-squid-network-requests";

export const subFeatureMap: {
  path: string;
  subFeature: Extract<EventProperties, { feature: "new-sale" }>["subFeature"];
  exact?: boolean;
}[] = [
  {
    path: "/a/",
    subFeature: "affiliate-landing",
  },
  {
    path: "/r/",
    subFeature: "referral-landing",
  },
  {
    path: "/refer/",
    subFeature: "referral-landing",
  },
  {
    path: "/join-flow",
    subFeature: "default-landing",
    exact: true,
  },
  {
    path: "/join-flow/",
    subFeature: "default-landing",
    exact: true,
  },
  {
    path: "/package-selection",
    subFeature: "package-selection",
  },
  {
    path: "/personal-details",
    subFeature: "personal-details",
  },
  {
    path: "/eero-selection",
    subFeature: "eero-selection",
  },
  {
    path: "/one-touch-switching",
    subFeature: "one-touch-switching",
  },
  {
    path: "/go-live-date",
    subFeature: "go-live-date",
  },
  {
    path: "/payment-details",
    subFeature: "payment-details",
  },
  {
    path: "/order-summary",
    subFeature: "order-summary",
  },
  {
    path: "/register-interest",
    subFeature: "register-interest",
  },
  {
    path: "/error",
    subFeature: "error",
  },
  {
    path: "/not-found",
    subFeature: "not-found",
  },
];

// Helper function to find the matching subFeature
export const getSubFeatureFromPath = (
  pathname: string,
): Extract<EventProperties, { feature: "new-sale" }>["subFeature"] => {
  const exactMatch = subFeatureMap.find(
    (item) => item.exact && pathname === item.path,
  );
  if (exactMatch) {
    return exactMatch.subFeature;
  }

  const startsWithMatch = subFeatureMap.find(
    (item) => !item.exact && pathname.includes(item.path),
  );
  if (startsWithMatch) {
    return startsWithMatch.subFeature;
  }

  return undefined;
};

// Squid accepts any key value string pair but we're being explicit in one central place here to make it easier to find in the future
type CustomEventProperties = {
  errorMessage?: string;
};

export const captureJoinFlowEvent = (
  event: string,
  properties: Pick<
    Extract<EventProperties, { feature: "new-sale" }>,
    "subFeature" | "outcome" | "type"
  > &
    CustomEventProperties,
) => {
  squidPosthogBrowserCaptureEvent(event, {
    feature: "new-sale",
    product: "join",
    ...properties,
  });
};
