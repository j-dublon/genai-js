"use client";

import {
  CookieNoticeProvider,
  DynamicCookieNotice,
} from "@react-component-library/ui";
import { ReactNode, Suspense } from "react";

import { PostHogProvider } from "@/providers/postHog/postHogProvider";
import { UserTracking } from "@/providers/userTracking/userTracking";

interface Props {
  children: ReactNode;
  gtmId?: string;
}

export const ClientAppShell = ({ children, gtmId }: Props) => {
  return (
    <CookieNoticeProvider gtmId={gtmId}>
      <PostHogProvider>
        <DynamicCookieNotice />
        <Suspense fallback={null}>
          <UserTracking />
        </Suspense>
        {children}
      </PostHogProvider>
    </CookieNoticeProvider>
  );
};
