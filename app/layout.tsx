import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XeroxMate | Customer Sign In",
  description:
    "Sign in to XeroxMate to manage print orders, uploads, and billing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}