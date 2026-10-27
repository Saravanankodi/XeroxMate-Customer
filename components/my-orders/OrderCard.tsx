
"use client";

import { useState } from "react";
import { Button } from "../ui";

type OrderCardData = {
  id: string;
  shopName: string;
  location: string;
  status: string;
  total: number;
  paymentMethod: string;
  pickupPin?: string | number | null;
};

type OrderCardProps = {
  order: OrderCardData;
};

export default function OrderCard({ order }: OrderCardProps) {
  const [copied, setCopied] = useState(false);

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

      {/* Order header */}
      <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-2xl font-bold tracking-tight text-[#00236F]">
              {order.id}
            </h3>

            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3.5 py-1.5 text-sm font-semibold text-amber-800">
              <span className="h-2 w-2 rounded-full bg-[#005AB6]" />
              {order.status.replaceAll("_", " ")}
            </span>
          </div>

          <p className="text-sm text-slate-500 sm:text-base">
            Submitted Today, 13 Oct 2026 at 12:05 PM
          </p>
        </div>

        {/* Shop information */}
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

      {/* Payment summary */}
      <div className="mx-4 mb-4 rounded-2xl bg-[#F2F3FF] p-4 sm:mx-6 sm:mb-6 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-100 text-xl font-bold text-amber-800">
              ₹
            </div>

            <div className="min-w-0 flex items-center justify-center gap-2">
              <p className="text-xl font-extrabold text-[#00236F] sm:text-base">
                Total: ₹{order.total.toFixed(2)}
              </p>

              <span className="inline-block rounded-lg bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                {order.paymentMethod}
              </span>
            </div>
          </div>

          {order.pickupPin != null && order.pickupPin !== "" && (
            <div className="flex items-center gap-3">
              <Button
               variant="secondary"
               size="sm">
                Cancel Order
              </Button>

              <Button
                size="sm"
                variant="primary"
                type="button"
                onClick={handleCopyPin}
              >
                Show Pickup Pass
              </Button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
