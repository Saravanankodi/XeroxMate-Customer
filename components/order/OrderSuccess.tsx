
"use client";

import {
  CheckCircle2,
  FileText,
  Printer,
  House,
  Radio,
  ReceiptText,
  Wallet,
} from "lucide-react";

type OrderSuccessProps = {
  orderId: string;
  shopName: string;
  paymentLabel: string;
  onViewOrders: () => void;
  onBackHome: () => void;

  // Optional order details
  fileName?: string;
  pageCount?: number;
  copies?: number;
  printType?: string;
  paperSize?: string;
  printingCost?: number;
  deliveryFee?: number;
  wrapperFee?: number;
  subsidy?: number;
  paidOnline?: number;
  onTrackOrder?: () => void;
  onDownloadReceipt?: () => void;
};

const money = (amount: number) =>
  `₹${amount.toFixed(2)}`;

export default function OrderSuccess({
  orderId,
  shopName,
  paymentLabel,
  onViewOrders,
  onBackHome,
  fileName = "Document.pdf",
  pageCount = 2,
  copies = 1,
  printType = "B/W Duplex",
  paperSize = "A4",
  printingCost = 1.5,
  deliveryFee = 0,
  wrapperFee = 0,
  subsidy = 0,
  paidOnline = 0,
  onTrackOrder,
  onDownloadReceipt,
}: OrderSuccessProps) {
  const subtotal = printingCost + deliveryFee + wrapperFee;
  const total = Math.max(0, subtotal - subsidy);
  const balance = Math.max(0, total - paidOnline);

  const isPaidAtShop =
    paymentLabel.toLowerCase().includes("shop") ||
    paymentLabel.toLowerCase().includes("pickup");

  return (
    <div className="mx-auto w-full max-w-140 space-y-3 text-slate-800">
      {/* Success banner */}
      <section className="flex flex-col items-start gap-4 rounded-xl border border-slate-100 bg-linear-to-r from-white to-blue-50 p-5 shadow-sm sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2
            size={38}
            strokeWidth={2.5}
            className="text-emerald-800"
          />
        </div>

        <div className="min-w-0">
          <p className="text-[10px] font-medium text-slate-500">
            Order ID: {orderId}
          </p>

          <h1 className="mt-1 text-xl font-extrabold tracking-tight text-blue-950 sm:text-2xl">
            Order Placed Successfully!
          </h1>

          <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
            {shopName} has received your order details.
            Check your order status for acceptance and real-time
            printing updates.
          </p>
        </div>
      </section>

      {/* Receipt */}
      <section className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
              Receipt Breakdown
            </p>
            <h2 className="text-base font-bold text-blue-950">
              Summary &amp; Payment
            </h2>
          </div>

          <div className="text-right">
            <p className="text-[10px] text-slate-500">
              Order Placed
            </p>
            <p className="text-xs font-semibold text-slate-800">
              {new Date().toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Document */}
        <div className="mt-4 flex items-start gap-3 rounded-xl bg-indigo-50 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-blue-700">
            <FileText size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="wrap-break-words text-xs font-bold text-blue-950">
              {fileName}
            </p>

            <div className="mt-2 flex flex-wrap gap-1.5">
              {[`${pageCount} Pages`, `${copies} ${copies === 1 ? "Copy" : "Copies"}`, printType, paperSize].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600"
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <p className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-500">
              <Printer size={12} />
              {printType.includes("Duplex")
                ? "Double-sided printing"
                : "Printing service"}
            </p>
          </div>

          <p className="shrink-0 text-xs font-bold text-slate-900">
            {money(printingCost)}
          </p>
        </div>

        {/* Charges */}
        <div className="mt-4 space-y-2 border-b border-slate-100 pb-4 text-xs">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">
              Document Base Charge ({pageCount} pages)
            </span>
            <span className="font-semibold">{money(printingCost)}</span>
          </div>

          {subsidy > 0 && (
            <div className="flex items-center justify-between gap-3">
              <span className="text-slate-500">
                Campus Student Subsidy
              </span>
              <span className="font-semibold text-emerald-700">
                -{money(subsidy)}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">
              Delivery Fee
            </span>
            <span className="font-semibold">
              {deliveryFee > 0 ? money(deliveryFee) : "FREE"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">
              Wrapper / Packaging Fee
            </span>
            <span className="font-semibold">
              {wrapperFee > 0 ? money(wrapperFee) : "FREE"}
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between gap-3 py-4">
          <div>
            <h3 className="text-sm font-extrabold text-blue-950">
              Total Payable
            </h3>
            <p className="mt-1 text-[10px] text-slate-500">
              Includes applicable charges
            </p>
          </div>

          <p className="text-xl font-extrabold text-blue-950">
            {money(total)}
          </p>
        </div>

        {/* Payment breakdown */}
        <div className="rounded-xl bg-indigo-50 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] text-slate-500">
                Paid Online
              </p>
              <p className="mt-1 text-xs font-semibold text-blue-950">
                {paidOnline > 0 ? "Online Payment" : "Balance Due at Pickup Desk"}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs font-semibold text-slate-700">
                {money(paidOnline)}
              </p>
              <p className="mt-1 text-sm font-extrabold text-blue-700">
                {isPaidAtShop || balance > 0
                  ? money(balance)
                  : money(0)}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-start gap-2 text-[10px] leading-4 text-slate-500">
            <Wallet size={13} className="mt-0.5 shrink-0" />
            <p>
              {paymentLabel}
              {balance > 0
                ? " · Pay the remaining balance directly at the shop."
                : " · No outstanding balance shown."}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={onTrackOrder ?? onViewOrders}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-950 px-4 text-xs font-bold text-white transition hover:bg-blue-900"
          >
            <Radio size={15} />
            Track this Order (Live Spooler)
          </button>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onDownloadReceipt}
              disabled={!onDownloadReceipt}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-50 px-3 text-xs font-semibold text-slate-700 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ReceiptText size={14} />
              PDF Receipt
            </button>

            <button
              type="button"
              onClick={onBackHome}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-indigo-50 px-3 text-xs font-semibold text-slate-700 transition hover:bg-indigo-100"
            >
              <House size={14} />
              Go to Home
            </button>
          </div>

          <button
            type="button"
            onClick={onViewOrders}
            className="w-full py-2 text-xs font-semibold text-blue-700 hover:text-blue-900"
          >
            View My Orders
          </button>
        </div>
      </section>
    </div>
  );
}
