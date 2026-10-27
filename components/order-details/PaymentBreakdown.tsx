
interface PaymentBreakdownProps {
  documentCost: number;
  preflightCost: number;
  convenienceFee: number;
  total: number;
  paymentStatus: string;
  onPay?: () => void;
}

export default function PaymentBreakdown({
  documentCost,
  preflightCost,
  convenienceFee,
  total,
  paymentStatus,
  onPay,
}: PaymentBreakdownProps) {
  const money = (amount: number) => `₹${amount.toFixed(2)}`;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold text-slate-800">
          PAYMENT BREAKDOWN
        </h3>

        <span className="rounded bg-rose-50 px-2 py-1 text-xs text-rose-700">
          {paymentStatus}
        </span>
      </div>

      <div className="mt-4 space-y-3 text-xs">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-medium text-slate-700">
              Document (B/W Single Sided)
            </p>
            <p className="mt-1 text-slate-500">
              Printing and paper charges
            </p>
          </div>
          <span className="font-semibold">{money(documentCost)}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-500">
            High-speed Spooling &amp; Preflight
          </span>
          <span className="font-semibold text-emerald-600">
            {preflightCost === 0 ? "FREE" : money(preflightCost)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-slate-500">
            Campus Subsidized Convenience Fee
          </span>
          <span className="font-medium">{money(convenienceFee)}</span>
        </div>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-slate-900">Final Total</p>
            <p className="mt-1 text-xs text-slate-500">
              Inclusive of all local taxes
            </p>
          </div>

          <span className="text-xl font-bold text-blue-700">
            {money(total)}
          </span>
        </div>

        <button
          type="button"
          onClick={onPay}
          disabled={paymentStatus.toLowerCase() === "paid"}
          className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {paymentStatus.toLowerCase() === "paid"
            ? "Payment Completed"
            : `Pay ${money(total)} via UPI / QR Now`}
        </button>

        <p className="mt-2 text-center text-[10px] text-slate-500">
          Or pay with physical cash / coin at the shop pickup counter.
        </p>
      </div>
    </section>
  );
}
