import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Details",
  description: "View your XeroxMate order status, pickup token and invoice.",
};

export default function OrderDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
