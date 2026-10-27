import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders",
  description: "Track active, completed and cancelled XeroxMate print orders.",
};

export default function MyOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
