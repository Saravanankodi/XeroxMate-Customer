import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment",
  description: "Review and pay for your XeroxMate print order.",
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
