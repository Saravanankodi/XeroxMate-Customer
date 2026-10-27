
"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Store,
  Truck,
  MapPin,
  CheckCircle2,
  Minus,
} from "lucide-react";
import {
  DELIVERY_FEE,
  WRAPPER_FEE,
  type FulfillmentMode,
  type PrintShop,
} from "@/data/store-types";


type FulfillmentModalProps = {
  open: boolean;
  shop: PrintShop;
  fileName: string;
  pageCount: number;
  quantity?: number;
  wrapperDefault?: boolean;
  onClose: () => void;
  onConfirm: (details: {
    fulfillment: FulfillmentMode;
    deliveryAddress: string;
    wrapper: boolean;
  }) => void;
};

export default function FulfillmentModal({
  open,
  shop,
  fileName,
  pageCount,
  quantity = 1,
  wrapperDefault = false,
  onClose,
  onConfirm,
}: FulfillmentModalProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const [fulfillment, setFulfillment] =
    useState<FulfillmentMode>("pickup");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [wrapper, setWrapper] = useState(wrapperDefault);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const initialFocus = dialogRef.current?.querySelector<HTMLElement>(
      "button:not([disabled])",
    );
    (initialFocus ?? dialogRef.current)?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), select, textarea, a[href], [tabindex]:not([tabindex="-1"])',
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
  }, [open, onClose]);

  if (!open) return null;

  const printCost = shop.printCost * pageCount * quantity;
  const deliveryFee = fulfillment === "delivery" ? DELIVERY_FEE : 0;
  const wrapperFee = wrapper ? WRAPPER_FEE : 0;
  const total = printCost + deliveryFee + wrapperFee;

  const canDeliver = shop.fulfillment.includes("delivery");
  const validAddress =
    fulfillment === "pickup" || deliveryAddress.trim().length >= 5;

  function confirmSelection() {
    if (!validAddress) return;

    onConfirm({
      fulfillment,
      deliveryAddress:
        fulfillment === "delivery" ? deliveryAddress.trim() : "",
      wrapper,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-3 backdrop-blur-[2px] sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fulfillment-title"
        className="my-auto w-full max-w-120 overflow-hidden rounded-2xl border border-slate-200 border-t-4 border-t-blue-600 bg-white shadow-2xl outline-none"
      >
        <div className="flex items-start justify-between gap-3 px-5 pb-3 pt-4">
          <div>
            <h2
              id="fulfillment-title"
              className="text-base font-bold text-slate-900"
            >
              How would you like to receive your order?
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Select your pickup preference for this order fulfilment.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close fulfilment dialog"
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={17} />
          </button>
        </div>

        {/* Selected shop */}
        <div className="mx-5 mb-3 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
          <div className="rounded-lg bg-white p-2 text-blue-700 shadow-sm">
            <Store size={17} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-bold">{shop.name}</p>
            <p className="mt-1 text-[11px] text-slate-500">
              {shop.address}
            </p>
          </div>
          <span className="shrink-0 rounded bg-emerald-50 px-1.5 py-1 text-[11px] font-semibold text-emerald-700">
            ★ {shop.rating.toFixed(1)}
          </span>
        </div>

        <div className="space-y-2 px-5">
          {/* Pickup option */}
          <button
            type="button"
            onClick={() => setFulfillment("pickup")}
            className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
              fulfillment === "pickup"
                ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-100"
                : "border-slate-200 hover:border-blue-200"
            }`}
          >
            <span className="rounded-lg bg-blue-700 p-2.5 text-white">
              <Store size={18} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2 text-xs font-bold">
                Pickup at shop
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                  RECOMMENDED
                </span>
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                {shop.open
                  ? "Shop currently open"
                  : "Confirm pickup time with the shop"}
              </span>
            </span>

            <span className="shrink-0 text-[11px] font-semibold text-emerald-700">
              FREE
            </span>

            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                fulfillment === "pickup"
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-300"
              }`}
            >
              {fulfillment === "pickup" && <CheckCircle2 size={13} />}
            </span>
          </button>

          {/* Delivery option */}
          <button
            type="button"
            disabled={!canDeliver}
            onClick={() => setFulfillment("delivery")}
            className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
              fulfillment === "delivery"
                ? "border-blue-600 bg-blue-50/60 ring-1 ring-blue-100"
                : "border-slate-200 hover:border-blue-200"
            }`}
          >
            <span className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
              <Truck size={18} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold">
                Campus & Hostel delivery
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                2 to 4 hours estimated delivery window
              </span>
              {!canDeliver && (
                <span className="mt-1 block text-[11px] text-rose-600">
                  Delivery is not enabled for this shop.
                </span>
              )}
            </span>

            <span className="shrink-0 text-[11px] font-semibold text-slate-500">
              +₹{DELIVERY_FEE}
            </span>

            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                fulfillment === "delivery"
                  ? "border-blue-700 bg-blue-700 text-white"
                  : "border-slate-300"
              }`}
            >
              {fulfillment === "delivery" && <CheckCircle2 size={13} />}
            </span>
          </button>

          {fulfillment === "delivery" && (
            <label className="block rounded-lg border border-slate-200 p-3">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold">
                <MapPin size={13} />
                Delivery address
              </span>
              <input
                value={deliveryAddress}
                onChange={(event) =>
                  setDeliveryAddress(event.target.value)
                }
                placeholder="Room number, hostel, block, street..."
                className="h-9 w-full rounded-md border border-slate-200 px-3 text-xs outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              {!validAddress && (
                <span className="mt-1 block text-xs text-rose-600">
                  Enter your delivery address to continue.
                </span>
              )}
            </label>
          )}

          {/* Optional wrapper */}
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
            <input
              type="checkbox"
              checked={wrapper}
              onChange={(event) => setWrapper(event.target.checked)}
              className="h-4 w-4 rounded accent-blue-700"
            />
            <span className="min-w-0 flex-1 text-xs text-slate-600">
              Add weatherproof moisture-lock seal wrapper
              <span className="mt-0.5 block text-[11px] text-slate-400">
                Recommended for thesis and exam documents
              </span>
            </span>
            <span className="shrink-0 text-xs font-semibold">
              +₹5.00
            </span>
          </label>
        </div>

        {/* Price breakdown */}
        <div className="mx-5 mt-3 rounded-xl bg-slate-50 p-3">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="min-w-0 break-words text-slate-600">
              Printing Charges · {fileName} · {pageCount} pages × {quantity} {quantity === 1 ? "set" : "sets"}
            </span>
            <b>₹{printCost.toFixed(2)}</b>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-600">
              Fulfilment fee
            </span>
            <b>{deliveryFee ? `₹${deliveryFee.toFixed(2)}` : "FREE"}</b>
          </div>

          {wrapper && (
            <div className="mt-2 flex items-center justify-between gap-2 text-xs">
              <span className="text-slate-600">Protective wrapper</span>
              <b>₹{wrapperFee.toFixed(2)}</b>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
            <div>
              <p className="text-xs font-bold">Total amount due</p>
              <p className="mt-1 text-[11px] text-slate-400">
                Estimated total · taxes subject to confirmation
              </p>
            </div>
            <p className="text-xl font-extrabold text-blue-950">
              ₹{total.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 p-5 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 items-center justify-center gap-1 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            <Minus size={12} />
            Change Shop
          </button>

          <button
            type="button"
            disabled={!validAddress}
            onClick={confirmSelection}
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-700 px-3 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm & Proceed to Pay
            <span className="rounded bg-white/15 px-1.5 py-0.5">
              ₹{total.toFixed(2)}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
