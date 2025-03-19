"use client";

import { parse } from "cookie";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

import PostHogPageView from "./postHogPageView";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const parsedCookie = parse(document.cookie);

    const bootstrapCookie = parsedCookie.posthogBootstrapData
      ? JSON.parse(parsedCookie.posthogBootstrapData)
      : null;

    if (
      process.env.NEXT_PUBLIC_POSTHOG_KEY &&
      process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        disable_session_recording: true,
        ...(bootstrapCookie ? { bootstrap: bootstrapCookie } : {}),
      });
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
