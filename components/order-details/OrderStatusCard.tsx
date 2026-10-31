
"use client";

import { useEffect, useRef, useState } from "react";
import { Info, X } from "lucide-react";

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
              body: "Your payload has been verified and synced with the shopkeeper's desktop terminal queue. The operator typically accepts jobs within 2-3 minutes during business hours.",
            };

  const statusTone = normalizedStatus.includes("cancel")
    ? "border-rose-200 bg-rose-50 text-rose-700"
    : normalizedStatus.includes("completed") ||
        normalizedStatus.includes("ready")
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-[#FDE68A] bg-[#FFFBEB] text-[#92400E]";

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
    <section className="flex flex-col gap-5 rounded-xl border border-[#E2E7F4] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="flex items-center gap-2 font-heading text-[30px] leading-9 font-extrabold tracking-[-0.75px] text-[#0F172A]">
              Order
              <span className="rounded-lg border border-[#DBEAFE] bg-[#EFF6FF] px-2.5 py-0.5 text-[26px] leading-9 font-semibold tracking-[-0.75px] text-[#1D4ED8]">
                #{orderId}
              </span>
            </h2>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs leading-4 font-bold ${statusTone}`}
            >
              <span className="size-2 rounded-full bg-[#F59E0B]" />
              {status}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs leading-4 font-bold ${
                balance > 0
                  ? "border-[#FECDD3] bg-[#FFF1F2] text-[#BE123C]"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              <Info size={14} />
              {balance > 0
                ? `${paymentStatus} · ₹${balance.toFixed(2)} at Counter`
                : paymentStatus}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="flex items-center gap-1">
              <span className="size-3.5 rounded-full border-[1.17px] border-[#94A3B8]" />
              <span className="text-xs leading-4 font-medium text-[#64748B]">
                Placed on:
              </span>
              <span className="pl-0.5 text-xs leading-4 font-bold text-[#334155]">
                {createdAt}
              </span>
            </div>
          </div>
        </div>

        {canCancel && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="inline-flex h-[34px] items-center gap-1.5 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3.5 py-2 text-xs leading-4 font-semibold text-[#DC2626] transition hover:bg-red-100"
            >
              <X size={16} />
              Cancel Order
            </button>
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-lg border border-[#BFDBFE]/80 bg-[#EFF6FF]/70 p-3.5">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
          <Info size={16} />
        </span>
        <div className="text-sm leading-5 text-[#0F172A]">
          <p className="font-bold">{statusInfo.title}</p>
          <p>{statusInfo.body}</p>
        </div>
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
            <h3
              id="cancel-order-title"
              className="font-heading text-lg font-bold text-[#0F172A]"
            >
              Cancel this order?
            </h3>
            <p className="mt-2 text-sm text-[#444651]">
              Are you sure you want to cancel order #{orderId}?
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm text-[#334155] transition hover:bg-slate-50"
              >
                Keep Order
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  onCancel?.();
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm text-white transition hover:bg-rose-700"
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
