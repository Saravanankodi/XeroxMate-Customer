
"use client";

import { useState } from "react";
import { Button } from "../ui";

interface OrderStatusCardProps {
  orderId: string;
  createdAt: string;
  status: string;
  paymentStatus: string;
  balance: number;
  onCancel?: () => void;
}

export default function OrderStatusCard({
  orderId,
  createdAt,
  status,
  paymentStatus,
  balance,
  onCancel,
}: OrderStatusCardProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-bold text-slate-900">
            Order <span className="text-blue-700">#{orderId}</span>
          </h2>

          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            ● {status}
          </span>

          <span className="rounded-full bg-rose-50 px-3 py-1 text-xs text-rose-700">
            ● {paymentStatus} · ₹{balance.toFixed(2)} at Counter
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() => setShowConfirm(true)}
            variant="danger"
            size="sm"
          >
            Cancel Order
          </Button>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Placed on: {createdAt}
      </p>

      <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/70 p-3 text-sm text-slate-600">
        <p className="font-semibold text-blue-900">
          Waiting for the print shop to accept your order
        </p>
        <p className="mt-1">
          Your payload has been verified and synced with the shopkeeper&apos;s
          desktop terminal queue. Acceptance typically takes 2–3 minutes
          during business hours.
        </p>
      </div>

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-order-title"
        >
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
            <h3 id="cancel-order-title" className="text-lg font-bold">
              Cancel this order?
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to cancel order #{orderId}?
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border px-4 py-2 text-sm"
              >
                Keep Order
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  onCancel?.();
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm text-white"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
