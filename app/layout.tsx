import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "XeroxMate | Smart Campus Printing",
    template: "%s | XeroxMate",
  },
  description:
    "Upload documents, compare nearby print shops and collect your prints without the queue.",
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