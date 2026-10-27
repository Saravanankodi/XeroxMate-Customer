"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Card, Checkbox, Input } from "@/components/ui";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex w-full items-center justify-center p-4">
      <Card padding="lg" className="w-full max-w-lg border-linear">
        <h1 className="font-heading text-2xl font-bold text-primary">
          Create Your Account
        </h1>

        <p className="mb-6 mt-2 text-sm font-sans text-muted">
          Upload documents, compare print shops and skip the queue.
        </p>

        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/sign-in");
          }}
        >
          <Input
            label="Full Name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />

          <Input
            label="Mobile Number"
            name="phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="10-digit mobile number"
            autoComplete="tel"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={8}
            required
          />

          <Checkbox
            name="terms"
            label="I agree to the terms of service and privacy policy"
            required
          />

          <Button type="submit" fullWidth>
            Create Account
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </main>
  );
}
