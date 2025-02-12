import "@react-component-library/ui/style.css";
import "../../fonts.css";

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
      </head>
      <body className="font-garnett">{children}</body>
    </html>
  );
}
