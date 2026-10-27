
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
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold text-slate-800">
          PAYMENT BREAKDOWN
        </h3>

        <span
          className={`rounded px-2 py-1 text-xs ${
            settled
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
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

        {deliveryFee > 0 && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">Delivery fee</span>
            <span className="font-semibold">{money(deliveryFee)}</span>
          </div>
        )}

        {wrapperFee > 0 && (
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">Protective wrapper</span>
            <span className="font-semibold">{money(wrapperFee)}</span>
          </div>
        )}

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

        {onPay && (
          <>
            <button
              type="button"
              onClick={onPay}
              disabled={settled}
              className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {settled
                ? normalizedStatus.includes("refund")
                  ? "Refunded"
                  : "Payment Completed"
                : `Pay ${money(amountDue)} via UPI / QR Now`}
            </button>

            {!settled && (
              <p className="mt-2 text-center text-xs text-slate-500">
                Or pay with physical cash / coin at the shop pickup counter.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
