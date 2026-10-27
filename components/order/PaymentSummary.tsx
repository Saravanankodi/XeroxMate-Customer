
import {
  FileText,
  MapPin,
  ShieldCheck,
  Store,
} from "lucide-react";

type PaymentSummaryProps = {
  shopName: string;
  shopAddress: string;
  fileName: string;
  pageCount: number;
  printingCost: number;
  deliveryFee: number;
  wrapperFee: number;
};

export default function PaymentSummary({
  shopName,
  shopAddress,
  fileName,
  pageCount,
  printingCost,
  deliveryFee,
  wrapperFee,
}: PaymentSummaryProps) {
  const total = printingCost + deliveryFee + wrapperFee;

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-slate-900">
        Order Summary
      </h2>

      <div className="mt-4 rounded-xl bg-indigo-50 p-4">
        <div className="flex items-start gap-3">
          <span className="rounded-lg bg-blue-900 p-2.5 text-white">
            <Store size={19} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">{shopName}</p>
            <p className="mt-1 flex items-start gap-1.5 text-xs leading-5 text-slate-500">
              <MapPin size={13} className="mt-1 shrink-0" />
              {shopAddress}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-lg border border-slate-100 p-3">
        <span className="rounded-lg bg-rose-50 p-2 text-rose-600">
          <FileText size={18} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="break-all text-xs font-semibold">{fileName}</p>
          <p className="mt-1 text-[11px] text-slate-500">
            {pageCount} pages · Printing order
          </p>
        </div>
      </div>

      <div className="my-5 space-y-3 text-xs">
        <div className="flex justify-between gap-3">
          <span className="text-slate-500">Printing charges</span>
          <span>₹{printingCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-slate-500">Delivery</span>
          <span>
            {deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}
          </span>
        </div>

        {wrapperFee > 0 && (
          <div className="flex justify-between gap-3">
            <span className="text-slate-500">Protective wrapper</span>
            <span>₹{wrapperFee.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="rounded-xl bg-indigo-50 p-4">
        <p className="text-xs font-semibold text-slate-600">
          Total payable
        </p>

        <p className="mt-1 text-3xl font-extrabold tracking-tight text-blue-950">
          ₹{total.toFixed(2)}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Final charges must be confirmed by the shop or payment service.
        </p>
      </div>

      <div className="mt-4 flex items-start gap-2 text-[11px] leading-5 text-slate-500">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-emerald-600" />
        <p>
          Your payment should be processed through a trusted payment
          provider. Do not store raw card details in your application.
        </p>
      </div>
    </aside>
  );
}
