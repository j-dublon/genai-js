import "@react-component-library/ui/ui.css";

import {
  PrefetchCrossZoneLinks,
  PrefetchCrossZoneLinksProvider,
} from "@vercel/microfrontends/next/client";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // This will be cuckoo's domain till we get a staging environment
  const baseUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN}`;

  return (
    <html lang="en">
      <head>
        <style>{`
          :root {
            --font-url-garnett-regular: "${baseUrl}/vc-ap-marketing/fonts/Garnett-Regular.woff2";
            --font-url-garnett-semibold: "${baseUrl}/vc-ap-marketing/fonts/Garnett-SemiBold.woff2";
          }
        `}</style>
      </head>
      <body className="font-garnett">
        <PrefetchCrossZoneLinksProvider>
          {children}
        </PrefetchCrossZoneLinksProvider>
        <PrefetchCrossZoneLinks />
        <SpeedInsights />
      </body>
    </html>
  );
}
