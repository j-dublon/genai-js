"use client";

import { useEffect } from "react";
import "@react-component-library/ui/style.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    //This will be cuckoo's domain till we get a staging environment
    const baseUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN}`;

    document.documentElement.style.setProperty(
      "--font-url-garnett-regular",
      `${baseUrl}/fonts/Garnett-Regular.woff2`,
    );
    document.documentElement.style.setProperty(
      "--font-url-garnett-semibold",
      `${baseUrl}/fonts/Garnett-SemiBold.woff2`,
    );
  }, []);

  return (
    <html lang="en">
      <body className="font-garnett">{children}</body>
    </html>
  );
}
