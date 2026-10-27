import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Print Order",
  description: "Upload a document and configure your XeroxMate print order.",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
