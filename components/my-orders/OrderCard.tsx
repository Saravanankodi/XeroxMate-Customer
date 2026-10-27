"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui";

type OrderCardData = {
  id: string;
  shopName: string;
  location: string;
  status: string;
  submittedAt?: string;
  total: number;
  paymentMethod: string;
  pickupPin?: string | number | null;
};

type OrderCardProps = {
  order: OrderCardData;
  canCancel?: boolean;
  onCancel?: (id: string) => void;
};

function formatSubmittedAt(value?: string) {
  if (!value) return "just now";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

export default function OrderCard({
  order,
  canCancel = false,
  onCancel,
}: OrderCardProps) {
  const [copied, setCopied] = useState(false);
  const normalizedStatus = order.status.toLowerCase();
  const statusTone = normalizedStatus.includes("cancel")
    ? "bg-rose-100 text-rose-800"
    : normalizedStatus.includes("completed") ||
        normalizedStatus.includes("ready")
      ? "bg-emerald-100 text-emerald-800"
      : "bg-amber-100 text-amber-800";
  const statusDot = normalizedStatus.includes("cancel")
    ? "bg-rose-600"
    : normalizedStatus.includes("completed") ||
        normalizedStatus.includes("ready")
      ? "bg-emerald-600"
      : "bg-amber-600";

  const shopInitials = order.shopName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleCopyPin = async () => {
    if (!order.pickupPin) return;

    try {
      await navigator.clipboard.writeText(String(order.pickupPin));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="h-1.5 bg-linear-to-r from-[#005AB6] via-[#0072E4] to-[#6BD8CB]" />

      <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-2xl font-bold tracking-tight text-[#00236F]">
              <Link
                href={`/my-orders/${order.id}`}
                className="hover:text-blue-700 hover:underline"
              >
                {order.id}
              </Link>
            </h3>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-semibold capitalize ${statusTone}`}
            >
              <span className={`h-2 w-2 rounded-full ${statusDot}`} />
              {order.status.replaceAll("_", " ")}
            </span>
          </div>

          <p className="text-sm text-slate-500 sm:text-base">
            Submitted {formatSubmittedAt(order.submittedAt)}
          </p>
        </div>

        <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-[#F2F3FF] p-3.5 sm:min-w-65">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#203D91] text-lg font-bold text-white">
            {shopInitials}
          </div>

          <div className="min-w-0">
            <p className="truncate font-bold text-slate-900">
              {order.shopName}
            </p>
            <p className="truncate text-sm text-slate-600">
              {order.location}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-4 mb-4 rounded-2xl bg-[#F2F3FF] p-4 sm:mx-6 sm:mb-6 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-100 text-xl font-bold text-amber-800">
              ₹
            </div>

            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <p className="text-xl font-extrabold text-[#00236F]">
                Total: ₹{order.total.toFixed(2)}
              </p>

              <span className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                {order.paymentMethod}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/my-orders/${order.id}`}
              className="inline-flex min-h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View Details
            </Link>

            {canCancel && onCancel && (
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => onCancel(order.id)}
              >
                Cancel Order
              </Button>
            )}

            {order.pickupPin != null && order.pickupPin !== "" && (
              <Button
                size="sm"
                variant="primary"
                type="button"
                onClick={handleCopyPin}
              >
                {copied ? "PIN Copied" : "Copy Pickup PIN"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
