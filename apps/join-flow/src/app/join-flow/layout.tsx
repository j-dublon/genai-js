import "@react-component-library/ui/ui.css";

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
            --font-url-garnett-regular: "${baseUrl}/fonts/Garnett-Regular.woff2";
            --font-url-garnett-semibold: "${baseUrl}/fonts/Garnett-SemiBold.woff2";
          }
        `}</style>
      </head>
      <body className="font-garnett">{children}</body>
    </html>
  );
}
