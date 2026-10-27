"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Button,
  Input,
  Card,
  Checkbox,
} from "@/components/ui";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="flex w-full items-center justify-center p-4">
      <Card padding="lg" className="w-full max-w-lg border-linear">
        <h1 className="text-2xl font-heading font-bold text-primary">
          Customer Sign In
        </h1>

        <p className="mb-6 mt-2 text-sm font-sans text-muted ">
          Access orders, uploads and billing.
        </p>

        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            // Connect your authentication API here.
          }}
        >
          <Input
            label="Registered Email or Mobile Number"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email or mobile number"
            autoComplete="username"
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />

          <Checkbox
            name="rememberMe"
            label="Remember on this computer"
            defaultChecked
          />

          <Button type="submit" fullWidth>
            Sign In to Customer Workspace
          </Button>

          <Button
            type="button"
            variant="outline"
            fullWidth
          >
            Continue with Google
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-muted">
          New to XeroxMate?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </Card>
    </main>
  );
}