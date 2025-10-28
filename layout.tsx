import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hanan Javid Qureshi",
  description: "Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
