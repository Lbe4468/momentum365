import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Momentum 365 | Private Membership",
  description: "Momentum 365 is a private member's association providing access to curated financial opportunities.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}