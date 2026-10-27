
"use client";

import { useEffect, useRef, useState } from "react";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const normalizedStatus = status.toLowerCase();
  const canCancel =
    normalizedStatus.includes("awaiting") ||
    normalizedStatus.includes("processing");

  const statusInfo = normalizedStatus.includes("cancel")
    ? {
        title: "Order cancelled",
        body: "This order was cancelled and will not be printed. No pickup is required.",
      }
    : normalizedStatus.includes("completed")
      ? {
          title: "Order completed",
          body: "These prints have been collected. Thanks for printing with XeroxMate.",
        }
      : normalizedStatus.includes("ready")
        ? {
            title: "Ready for pickup",
            body: "Your prints are ready. Show your pickup token and OTP at the shop counter.",
          }
        : normalizedStatus.includes("processing")
          ? {
              title: "Your order is being printed",
              body: "The print shop has accepted your order and is processing it now.",
            }
          : {
              title: "Waiting for the print shop to accept your order",
              body: "Your payload has been verified and synced with the shopkeeper's desktop terminal queue. Acceptance typically takes 2-3 minutes during business hours.",
            };

  const statusTone = normalizedStatus.includes("cancel")
    ? "bg-rose-50 text-rose-700"
    : normalizedStatus.includes("completed") ||
        normalizedStatus.includes("ready")
      ? "bg-emerald-50 text-emerald-700"
      : "bg-amber-50 text-amber-700";

  useEffect(() => {
    if (!showConfirm) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const initialFocus = dialogRef.current?.querySelector<HTMLElement>(
      'button:not([disabled])',
    );
    (initialFocus ?? dialogRef.current)?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowConfirm(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [showConfirm]);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-xl font-bold text-slate-900">
            Order <span className="text-blue-700">#{orderId}</span>
          </h2>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusTone}`}
          >
            {status}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs ${
              balance > 0
                ? "bg-rose-50 text-rose-700"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
              {balance > 0
                ? `${paymentStatus} · ₹${balance.toFixed(2)} at Counter`
                : paymentStatus}
          </span>
        </div>

        {canCancel && (
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
        )}
      </div>

      <p className="mt-3 text-xs text-slate-500">
        Placed on: {createdAt}
      </p>

      <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/70 p-3 text-sm text-slate-600">
        <p className="font-semibold text-blue-900">{statusInfo.title}</p>
        <p className="mt-1">{statusInfo.body}</p>
      </div>

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cancel-order-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowConfirm(false);
          }}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl outline-none"
          >
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
