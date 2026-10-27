
import Link from "next/link";
import { Plus, RefreshCw } from "lucide-react";
import { Button } from "../ui";

interface PageHeadingProps {
  onRefresh?: () => void;
}

export default function PageHeading({
  onRefresh,
}: PageHeadingProps) {
  return (
    <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl font-bold tracking-tight text-[#00236F]">
          My Orders
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-5 text-[#444651]">
          Real-time telemetry and counter pickup verification
          across campus print hubs. Track spooling, Ricoh laser
          progress, and fetch your kiosk OTP.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRefresh}
        >
          <RefreshCw
            size={13}
            className="text-[#005AB6]"
          />
          Refresh Queue
        </Button>

        <Link
          href="/order"
          className="inline-flex items-center gap-2 rounded-lg bg-[#0072E4] px-3 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-blue-700"
        >
          <Plus size={14} />
          New Print Order
        </Link>
      </div>
    </section>
  );
}
