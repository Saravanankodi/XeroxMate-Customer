
interface AssignedPrintShopProps {
  name: string;
  address: string;
  phone: string;
  rating: number;
  open: boolean;
  hours: string;
  directionsUrl?: string;
  onCallOperator?: () => void;
}

export default function AssignedPrintShop({
  name,
  address,
  phone,
  rating,
  open,
  hours,
  directionsUrl,
  onCallOperator,
}: AssignedPrintShopProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold text-slate-800">
          ▣ ASSIGNED PRINT SHOP
        </h3>

        <span
          className={`rounded-full px-2 py-1 text-xs ${
            open
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          ● {open ? "Open Now" : "Closed"}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="font-bold text-slate-900">{name}</h4>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {address}
            </p>
          </div>

          <span className="shrink-0 text-xs font-semibold text-amber-600">
            ★ {rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-4 space-y-3 border-t border-slate-100 pt-3 text-xs">
          <div className="flex items-center justify-between gap-3">
            <span className="text-slate-500">☎ Phone Support</span>
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className="font-semibold text-blue-700 hover:underline"
            >
              {phone}
            </a>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="text-slate-500">◷ Today&apos;s Hours</span>
            <span className="text-right font-medium text-slate-700">
              {hours}
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={directionsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-xs font-semibold hover:bg-slate-50"
          >
            ▣ Directions
          </a>

          <button
            type="button"
            onClick={onCallOperator}
            className="rounded-lg bg-blue-50 px-3 py-2.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
          >
            ☎ Call Operator
          </button>
        </div>
      </div>
    </section>
  );
}
