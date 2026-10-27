import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choose a Print Shop",
  description: "Compare nearby XeroxMate print shops by price and distance.",
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
