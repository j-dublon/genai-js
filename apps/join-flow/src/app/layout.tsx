import "../../fonts.css";

import {
  PrefetchCrossZoneLinks,
  PrefetchCrossZoneLinksProvider,
} from "@vercel/microfrontends/next/client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";

import { DynamicCookieNotice } from "@/components/CookieNotice";
import { CookieNoticeProvider } from "@/contexts/CookieNotice";
import { defaultChoices } from "@/contexts/CookieNotice/defaultChoices";
import { PostHogProvider } from "@/providers/postHog/postHogProvider";
import { UserTracking } from "@/providers/userTracking/userTracking";

export const metadata: Metadata = {
  title: "Join Flow",
  description: "Join our platform",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const isDev = !process.env.VERCEL;
  const scheme = isDev ? "http://" : "https://";
  const baseUrl = `${scheme}${process.env.NEXT_PUBLIC_DOMAIN}`;

  return (
    <html lang="en">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-url-garnett-regular: "${baseUrl}/vc-ap-join-flow/fonts/Garnett-Regular.woff2";
                --font-url-garnett-semibold: "${baseUrl}/vc-ap-join-flow/fonts/Garnett-SemiBold.woff2";
              }
            `,
          }}
          precedence="default"
          href="font-variables"
        />
        <Script
          id="gtm-init"
          // We want this snippet to appear early on so other items that depend
          // on `gtag` do not need to re-create the function. `beforeInteractive`
          // will pop this code directly in the <head> of the HTML response from
          // Next
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}

      gtag('consent', 'default', ${JSON.stringify(defaultChoices)});`,
          }}
        />
      </head>
      <body className="font-garnett">
        <PrefetchCrossZoneLinksProvider>
          <CookieNoticeProvider gtmId={process.env.GTM_ID}>
            <PostHogProvider>
              <DynamicCookieNotice />
              <Suspense fallback={null}>
                <UserTracking />
              </Suspense>
              {children}
            </PostHogProvider>
          </CookieNoticeProvider>
        </PrefetchCrossZoneLinksProvider>
        <PrefetchCrossZoneLinks />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
