import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Flow",
  description: "Join our platform",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
