
import { CheckCircle2, MapPin } from "lucide-react";

type ProfileHeaderProps = {
  addressCount: number;
};

export default function ProfileHeader({ addressCount }: ProfileHeaderProps) {
  return (
    <section className="border-b border-slate-200/70 pb-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900">
            Profile &amp; Account Settings
          </h1>

          <p className="mt-1 max-w-2xl text-base leading-5 text-slate-500">
            Manage your personal contact details, campus pickup verification,
            delivery addresses, and instant refund payout channels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700">
            <CheckCircle2 size={12} />
            Verified
          </span>

          <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-600">
            <MapPin size={12} />
            {addressCount} Saved {addressCount === 1 ? "Location" : "Locations"}
          </span>
        </div>
      </div>
    </section>
  );
}
