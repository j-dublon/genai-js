import "../../fonts.css";
import "@react-component-library/ui/ui.css";
import "./globals.css";

import {
  PrefetchCrossZoneLinks,
  PrefetchCrossZoneLinksProvider,
} from "@vercel/microfrontends/next/client";
import type { Metadata } from "next";
import Script from "next/script";

import { DynamicCookieNotice } from "@/components/molecules/CookieNotice";
import { CookieNoticeProvider } from "@/contexts/CookieNotice";
import { defaultChoices } from "@/contexts/CookieNotice/defaultChoices";
import { PostHogProvider } from "@/providers/postHog/postHogProvider";

const SITE_TITLE = "Cuckoo Broadband";
const SITE_DESCRIPTION =
  "Switch Broadband, for good · Incredible full fibre broadband speeds · Award-winning customer services · And fair pricing.";
const SITE_IMAGE =
  "https://images.prismic.io/cuckoo-egg/1a390bff-765c-4d5a-b148-bf60de7c3a22_cuckoo.png?auto=compress,format&rect=0,0,2176,1226&w=600&h=338";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: "Cuckoo",
  openGraph: {
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGE,
        width: 600,
        height: 338,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any", type: "image/x-icon" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isDev = !process.env.VERCEL;
  const scheme = isDev ? "http://" : "https://";
  const baseUrl = `${scheme}${process.env.NEXT_PUBLIC_DOMAIN}`;

  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --font-url-garnett-regular: "${baseUrl}/fonts/Garnett-Regular.woff2";
            --font-url-garnett-semibold: "${baseUrl}/fonts/Garnett-SemiBold.woff2";
            }
        `}</style>
        {/*
      This is a little odd to follow when you're looking at much of the
      documentation for gtag.js vs Google Tag Manager. It comes down to us
      having our own consent banner so we signal that to Google with standard
      mechanisms in `gtag` but we otherwise load the Google Tag Manager snippet
      and manage all our tags there.

      `gtag('consent', 'default', ...` must be called with default deny. Then
      `gtag('consent', 'update', ...` must then be called once the banner has
      been interacted with and on all subsequent visits with the value we set
      in `localStorage`. If you modify any of this, you will want to verify the
      result with Tag Manager Assistant.

      Note that the below inline script has an `id` prop which is important
      for Next to track this script between renders.

      See: https://nextjs.org/docs/app/api-reference/components/script
      See: https://tagassistant.google.com/
      See: https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic#tag-manager
       */}
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
              {children}
            </PostHogProvider>
          </CookieNoticeProvider>
        </PrefetchCrossZoneLinksProvider>
        <PrefetchCrossZoneLinks />
      </body>
    </html>
  );
}
