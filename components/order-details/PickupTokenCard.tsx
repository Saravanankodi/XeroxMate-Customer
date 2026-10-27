
interface PickupTokenCardProps {
  otp: string;
  orderId: string;
  active: boolean;
}

export default function PickupTokenCard({
  otp,
  orderId,
  active,
}: PickupTokenCardProps) {
  return (
    <section className="rounded-xl bg-linear-to-br from-slate-950 to-blue-950 p-5 text-white shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="rounded bg-blue-900/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-blue-200">
          Express Counter Pass
        </span>

        <span className="text-xs text-slate-300">
          {active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">
            Self-Service Counter PickUp Token
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Show this token at the counter
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[10px] text-slate-300">
            4-Digit Security OTP
          </p>
          <p className="mt-1 font-mono text-xl font-bold tracking-[0.35em] text-amber-300">
            {otp}
          </p>
        </div>
      </div>

      <div className="mt-4 border-t border-white/10 pt-3">
        <p className="text-xs text-slate-300">
          Order: {orderId}
        </p>
        <p className="mt-1 text-[10px] text-slate-400">
          Keep this code private and share it only at the authorized pickup counter.
        </p>
      </div>
    </section>
  );
}
