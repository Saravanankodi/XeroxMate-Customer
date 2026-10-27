
import { CheckCircle2, MapPin } from "lucide-react";

export default function ProfileHeader() {
  return (
    <section className="border-b border-slate-200/70 pb-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Profile &amp; Account Settings
          </h1>

          <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
            Manage your personal contact details, campus pickup verification,
            delivery addresses, and instant refund payout channels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700">
            <CheckCircle2 size={12} />
            Verified
          </span>

          <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-medium text-slate-600">
            <MapPin size={12} />
            3 Saved Locations
          </span>
        </div>
      </div>
    </section>
  );
}
