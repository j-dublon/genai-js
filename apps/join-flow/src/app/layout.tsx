import "../../fonts.css";

import type { Metadata } from "next";

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
      </head>
      <body className="font-garnett">{children}</body>
    </html>
  );
};

export default RootLayout;
