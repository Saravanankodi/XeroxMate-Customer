
interface PickupTokenCardProps {
  otp: string;
  orderId: string;
  active: boolean;
}

export default function PickupTokenCard({
  otp,
  active,
}: PickupTokenCardProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-xl bg-linear-to-br from-[#0F172A] to-[#172554] p-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
      <div className="relative z-10 flex items-start justify-between gap-2 border-b border-[#334155]/60 pb-2">
        <div className="flex flex-col gap-1">
          <span className="w-fit rounded border border-[#60A5FA]/30 bg-[#3B82F6]/20 px-2 py-0.5 text-[10px] leading-[15px] font-bold tracking-[1px] text-[#93C5FD] uppercase">
            {active ? "Express Counter Pass" : "Counter Pass Inactive"}
          </span>

          <h3 className="font-heading text-sm leading-7 font-bold text-white">
            Self-Service Counter PickUp Token
          </h3>
        </div>

        <div className="text-right">
          <p className="text-xs leading-4 text-[#94A3B8]">
            4-Digit Security OTP
          </p>
          <p className="font-mono text-xl leading-7 font-semibold tracking-[10px] text-[#FBBF24]">
            {otp}
          </p>
        </div>
      </div>

      {/* <p className="relative z-10 mt-3 text-xs leading-4 text-[#94A3B8]">
        Order: {orderId}
      </p>

      <div className="pointer-events-none absolute -right-10 -bottom-10 size-44 rounded-full bg-[#3B82F6]/10 blur-[20px]" /> */}
    </section>
  );
}
