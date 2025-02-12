"use client";
import { useEffect } from "react";
import "@react-component-library/ui/style.css";
import "../../fonts.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const isDev = !process.env.VERCEL;

    const scheme = isDev ? "http://" : "https://";
    const baseUrl = `${scheme}${process.env.NEXT_PUBLIC_DOMAIN}`;

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
