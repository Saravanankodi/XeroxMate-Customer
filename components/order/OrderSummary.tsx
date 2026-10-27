
"use client";

import { PrintShop } from "@/data/store-types";
import {
  ArrowRight,
  ArrowLeft,
  FileText,
  LockKeyhole,
  Store,
  BadgeCheck,
} from "lucide-react";



type OrderSummaryProps = {
  shop: PrintShop;
  fileName: string;
  pageCount: number;
  quantity?: number;
  onContinue: () => void;
  onBack: () => void;
};

export default function OrderSummary({
  shop,
  fileName,
  pageCount,
  quantity = 1,
  onContinue,
  onBack,
}: OrderSummaryProps) {
  const printCost = shop.printCost * pageCount * quantity;
  const subsidy = 0;
  const tax = 0;
  const total = Math.max(0, printCost - subsidy + tax);

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
            <BadgeCheck size={13} />
            XeroxMate Certified Partner Hub
          </p>

          <h2 className="mt-1 text-base font-bold leading-tight">
            {shop.name}
          </h2>

          <p className="mt-1 text-xs leading-4 text-slate-500">
            {shop.locality} · {shop.distance} from your GPS pin
          </p>
        </div>

        <div className="rounded-xl bg-indigo-50 p-2.5 text-blue-900">
          <Store size={18} />
        </div>
      </div>

      <div className="rounded-xl bg-indigo-50 p-3">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Configured File
          </span>

          <span className="text-[11px] font-semibold text-blue-700">
            1 file attached
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="shrink-0 rounded-lg bg-blue-950 p-2.5 text-white">
            <FileText size={17} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="break-all text-[11px] font-semibold text-slate-800">
              {fileName || "Document.pdf"}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              {pageCount} pages · Black & White · Duplex · {quantity} {quantity === 1 ? "Copy" : "Copies"}
            </p>
          </div>
        </div>
      </div>

      <div className="my-4 space-y-3 text-xs">
        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-500">
            Laser Print Cost ({pageCount} pages A× {quantity}{" "}
            {quantity === 1 ? "set" : "sets"})
          </span>
          <b>₹{printCost.toFixed(2)}</b>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-500">
            Campus Student Subsidy
          </span>
          <b className="text-emerald-700">
            −₹{subsidy.toFixed(2)} (Waived)
          </b>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-500">GST (included)</span>
          <b>₹{tax.toFixed(2)}</b>
        </div>
      </div>

      <div className="rounded-xl bg-indigo-50 p-3.5">
        <p className="text-xs font-bold">Final Payable</p>
        <p className="mt-1 text-[11px] text-slate-500">
          Instant UPI / Pay at Counter
        </p>
        <p className="mt-1 text-2xl font-extrabold tracking-tight text-blue-950">
          ₹{total.toFixed(2)}
        </p>
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-lg bg-indigo-50/70 p-3">
        <LockKeyhole
          size={13}
          className="mt-0.5 shrink-0 text-emerald-700"
        />
        <p className="text-[11px] leading-4 text-slate-600">
          Zero-Leak Guard: documents should be handled securely and
          removed from temporary storage according to your retention policy.
        </p>
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-900 to-blue-600 px-3 text-xs font-semibold text-white shadow-sm transition hover:brightness-110"
      >
        Confirm Shop & Proceed
        <ArrowRight size={14} />
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mt-2 flex h-9 w-full items-center justify-center gap-1 rounded-lg bg-indigo-50 px-3 text-xs font-semibold text-slate-600 transition hover:bg-indigo-100"
      >
        <ArrowLeft size={13} />
        Back to Specifications
      </button>
    </aside>
  );
}
