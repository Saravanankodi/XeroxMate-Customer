import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a XeroxMate account to upload and print documents.",
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
