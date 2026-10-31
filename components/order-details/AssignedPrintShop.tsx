
import { Clock, MapPin, Navigation, Phone, PhoneCall, Star, Store } from "lucide-react";

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
    <section className="flex flex-col gap-4 rounded-xl border border-[#E2E7F4] bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
        <h3 className="flex items-center gap-1.5 font-heading text-lg leading-5 font-bold tracking-[0.7px] text-[#0F172A] uppercase">
          <Store size={16} className="shrink-0 text-[#2563EB]" />
          Assigned Print Shop
        </h3>

        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] leading-4 font-bold ${
            open
              ? "border-[#A7F3D0] bg-[#ECFDF5] text-[#047857]"
              : "border-[#FECDD3] bg-[#FFF1F2] text-[#BE123C]"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${open ? "bg-[#10B981]" : "bg-[#F43F5E]"}`}
          />
          {open ? "Open Now" : "Closed"}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-heading text-base leading-6 font-extrabold text-[#0F172A]">
            {name}
          </h4>

          <span className="flex shrink-0 items-center gap-0.5 text-xs leading-4">
            <Star size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
            <span className="font-bold text-[#F59E0B]">{rating.toFixed(1)}</span>
          </span>
        </div>

        <div className="flex items-start gap-1.5">
          <MapPin size={16} className="mt-1 shrink-0 text-[#94A3B8]" />
          <p className="text-xs leading-5 text-[#64748B]">{address}</p>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#F1F5F9] pt-2 text-xs leading-4">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <Phone size={14} className="text-[#64748B]" />
              Phone Support
            </span>
            <a
              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
              className="font-semibold text-[#1D4ED8] hover:underline"
            >
              {phone}
            </a>
          </div>

          <div className="flex items-start justify-between gap-3">
            <span className="flex items-center gap-1.5 text-[#64748B]">
              <Clock size={14} className="text-[#64748B]" />
              Today&apos;s Hours
            </span>
            <span className="text-right font-medium text-[#1E293B]">
              {hours}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={directionsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-[34px] items-center justify-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2 text-sm leading-4 font-semibold text-[#334155] transition hover:bg-slate-100"
          >
            <Navigation size={14} className="text-[#64748B]" />
            Directions
          </a>

          <button
            type="button"
            onClick={onCallOperator}
            className="inline-flex h-[34px] items-center justify-center gap-1.5 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-3 py-2 text-sm leading-4 font-semibold text-[#1D4ED8] transition hover:bg-blue-100"
          >
            <PhoneCall size={14} className="text-[#1D4ED8]" />
            Call Operator
          </button>
        </div>
      </div>
    </section>
  );
}
