"use client";

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
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8FF] p-4">
      <Card padding="lg" className="w-full max-w-lg border-t-4 border-linear">
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
      </Card>
    </main>
  );
}