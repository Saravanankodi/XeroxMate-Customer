
import { QrCode } from "lucide-react";

interface PaymentBreakdownProps {
  documentCost: number;
  preflightCost: number;
  convenienceFee: number;
  deliveryFee?: number;
  wrapperFee?: number;
  total: number;
  amountDue?: number;
  paymentStatus: string;
  onPay?: () => void;
}

export default function PaymentBreakdown({
  documentCost,
  preflightCost,
  convenienceFee,
  deliveryFee = 0,
  wrapperFee = 0,
  total,
  amountDue = total,
  paymentStatus,
  onPay,
}: PaymentBreakdownProps) {
  const money = (amount: number) => `₹${amount.toFixed(2)}`;
  const normalizedStatus = paymentStatus.toLowerCase();
  const settled =
    (normalizedStatus.includes("paid") &&
      !normalizedStatus.includes("unpaid")) ||
    normalizedStatus.includes("refund") ||
    normalizedStatus.includes("complete");

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-[#E2E7F4] bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
        <h3 className="font-heading text-lg leading-5 font-bold tracking-[0.7px] text-[#0F172A] uppercase">
          Payment Breakdown
        </h3>

        <span
          className={`rounded border px-2 py-0.5 text-xs leading-4 font-semibold ${
            settled
              ? "border-[#A7F3D0] bg-[#ECFDF5] text-[#047857]"
              : "border-[#FECACA] bg-[#FEF2F2] text-[#B91C1C]"
          }`}
        >
          {paymentStatus}
        </span>
      </div>

      <div className="flex flex-col gap-2.5 text-xs">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="leading-4 font-bold text-[#1E293B]">
              Document (B/W Single Sided)
            </p>
            <p className="mt-0.5 leading-4 text-[#64748B]">
              Printing and paper charges
            </p>
          </div>
          <span className="leading-4 font-semibold text-[#0F172A]">
            {money(documentCost)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="leading-4 text-[#475569]">
            High-speed Spooling &amp; Preflight
          </span>
          {preflightCost === 0 ? (
            <span className="rounded bg-[#ECFDF5] px-1.5 py-0.5 text-[11px] leading-4 font-semibold text-[#047857] uppercase">
              Free
            </span>
          ) : (
            <span className="leading-4 font-semibold text-[#0F172A]">
              {money(preflightCost)}
            </span>
          )}
        </div>

        {deliveryFee > 0 && (
          <div className="flex items-center justify-between gap-3">
            <span className="leading-4 text-[#475569]">Delivery fee</span>
            <span className="leading-4 font-semibold text-[#0F172A]">
              {money(deliveryFee)}
            </span>
          </div>
        )}

        {wrapperFee > 0 && (
          <div className="flex items-center justify-between gap-3">
            <span className="leading-4 text-[#475569]">Protective wrapper</span>
            <span className="leading-4 font-semibold text-[#0F172A]">
              {money(wrapperFee)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <span className="leading-4 text-[#475569]">
            Campus Subsidized Convenience Fee
          </span>
          <span className="leading-4 font-normal text-[#64748B]">
            {money(convenienceFee)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#E2E8F0] pt-3">
        <div>
          <p className="font-heading text-base leading-6 font-extrabold text-[#0F172A]">
            Final Total
          </p>
          <p className="text-xs leading-6 text-[#64748B]">
            Inclusive of all local taxes
          </p>
        </div>

        <span className="text-xl leading-7 font-semibold text-[#1D4ED8]">
          {money(total)}
        </span>
      </div>

      {onPay && (
        <div className="flex flex-col gap-1.5 border-t border-[#F1F5F9] pt-3">
          <button
            type="button"
            onClick={onPay}
            disabled={settled}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2.5 font-heading text-sm leading-4 font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <QrCode size={16} />
            {settled
              ? normalizedStatus.includes("refund")
                ? "Refunded"
                : "Payment Completed"
              : `Pay ${money(amountDue)} via UPI / QR Now`}
          </button>

          {!settled && (
            <p className="text-center text-xs leading-4 font-medium text-[#64748B]">
              or pay with physical cash / coin at shop pickup counter
            </p>
          )}
        </div>
      )}
    </section>
  );
}
