"use client";

import { parse } from "cookie";
import client from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

import PostHogPageView from "./postHogPageView";

// This is declared outside the function to ensure the code is only run once when this module is imported
// for the first time and not on every render. It will also load before rendering which is what we want (i.e. earlier
// in the lifecycle than in a useEffect)
if (typeof window !== "undefined") {
  const pageBootstrap = window.__NEXT_DATA__?.props?.pageProps?.posthog;
  const parsedCookie = parse(document.cookie);
  let cookieBootstrap;
  if (parsedCookie.posthogBootstrapData) {
    cookieBootstrap = JSON.parse(parsedCookie.posthogBootstrapData);
  }

  const bootstrap = cookieBootstrap || pageBootstrap;

  client.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // "hydrate" posthog client with server data
    ...(bootstrap ? { bootstrap } : {}),
    // we will turn this on dynamically, either for key journeys or using
    // feature flags
    disable_session_recording: true,
    loaded(posthog) {
      // expose for internal use in devtools / util-squid-network-requests tracking
      window.$$POSTHOG = posthog;
      // enable extra logging in dev
      if (process.env.NEXT_PUBLIC_POSTHOG_DEBUG === "true") {
        posthog.debug();
      }
    },
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={client}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
