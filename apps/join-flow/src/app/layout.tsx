import "../../fonts.css";

import {
  PrefetchCrossZoneLinks,
  PrefetchCrossZoneLinksProvider,
} from "@vercel/microfrontends/next/client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import Script from "next/script";

import { ClientAppShell } from "@/components/ClientAppShell";
import { defaultChoices } from "@/contexts/CookieNotice/defaultChoices";

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
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', ${JSON.stringify(defaultChoices)});
            `,
          }}
        />
      </head>
      <body className="font-garnett">
        <PrefetchCrossZoneLinksProvider>
          <ClientAppShell gtmId={process.env.GTM_ID}>{children}</ClientAppShell>
        </PrefetchCrossZoneLinksProvider>
        <PrefetchCrossZoneLinks />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
