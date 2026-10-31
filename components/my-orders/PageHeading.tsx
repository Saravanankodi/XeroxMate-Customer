
import Link from "next/link";
import { Plus, RefreshCw } from "lucide-react";

interface PageHeadingProps {
  onRefresh?: () => void;
}

export default function PageHeading({
  onRefresh,
}: PageHeadingProps) {
  return (
    <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="max-w-[672px]">
        <h1 className="font-heading text-[32px] leading-[44px] font-bold tracking-[-0.9px] text-[#00236F]">
          My Orders
        </h1>

        <p className="mt-1 max-w-[672px] text-sm leading-5 text-[#444651]">
          Real-time telemetry and counter pickup verification
          across campus print hubs. Track spooling, Ricoh laser
          progress, and fetch your kiosk OTP.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onRefresh}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#F2F3FF] px-3.5 py-2.5 text-sm font-medium text-black! shadow-sm transition hover:bg-[#E2E7FF]"
        >
          <RefreshCw size={12} className="text-primary" />
          Refresh Queue
        </button>

        <Link
          href="/order"
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white! shadow-md transition hover:brightness-105"
        >
          <Plus size={12} className="text-white!" />
          New Print Order
        </Link>
      </div>
    </section>
  );
}
