
import {
  Printer,
  BadgeCheck,
  Star,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

type PrintShopCardProps = {
  name?: string;
  rating?: number;
  reviewCount?: number;
  partnerLabel?: string;
  phoneNumber?: string;
  address?: string;
  openingHours?: string;
};

export default function PrintShopCard({
  name = "Tamil Printers",
  rating = 5.0,
  reviewCount = 142,
  partnerLabel = "Anna Univ Partner Node",
  phoneNumber = "",
  address = "No.4 Bismi Nagar, Baburajapuram, Kumbakonam, Tamil Nadu 612302",
  openingHours = "9:00 AM – 11:00 PM",
}: PrintShopCardProps) {
  return (
    <section className="w-full rounded-xl bg-white p-3 sm:p-4 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00236F] text-white shadow-sm">
            <Printer size={18} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base font-bold leading-tight text-[#131B2E] sm:text-xl">
                {name}
              </h2>

              <BadgeCheck
                size={16}
                strokeWidth={2.5}
                className="shrink-0 text-[#005AB6]"
                aria-label="Verified shop"
              />
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              <span className="inline-flex items-center gap-1 font-medium text-[#00312C]">
                <Star size={12} strokeWidth={2.5} />
                {rating.toFixed(1)}
              </span>

              <span className="text-[#444651]">·</span>

              <span className="text-[#444651]">
                {reviewCount} verified student ratings
              </span>

              <span className="hidden text-[#444651] sm:inline">·</span>

              <span className="font-medium text-[#005AB6]">
                {partnerLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Call button */}
        <a
          href={phoneNumber ? `tel:${phoneNumber}` : undefined}
          aria-disabled={!phoneNumber}
          className={`inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-[#F2F3FF] px-5 py-3 text-xs font-medium text-[#00236F] shadow-sm transition-colors sm:self-center ${
            phoneNumber
              ? "hover:bg-[#E5E8FF]"
              : "cursor-not-allowed opacity-70"
          }`}
        >
          <Phone size={14} strokeWidth={2.3} />
          Call Shop
        </a>
      </div>

      {/* Shop metadata */}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Pickup address */}
        <div className="flex min-h-22 items-start gap-3 rounded-lg bg-[#F2F3FF] p-3">
          <MapPin
            size={18}
            strokeWidth={2.2}
            className="mt-0.5 shrink-0 text-[#005AB6]"
          />

          <div className="min-w-0">
            <h3 className="text-xs font-semibold leading-7 text-[#131B2E]">
              Pickup Address
            </h3>

            <p className="mt-1 wrap-break-words text-xs leading-6 text-[#444651]">
              {address}
            </p>
          </div>
        </div>

        {/* Opening hours */}
        <div className="flex min-h-22 items-start gap-3 rounded-lg bg-[#F2F3FF] p-3">
          <Clock
            size={18}
            strokeWidth={2.2}
            className="mt-0.5 shrink-0 text-[#004942]"
          />

          <div className="min-w-0">
            <h3 className="text-xs font-semibold leading-7 text-[#131B2E]">
              Live Queue &amp; Timings
            </h3>

            <p className="mt-1 text-xs leading-6 text-[#444651]">
              Open Now:{" "}
              <span className="font-medium text-[#131B2E]">
                {openingHours}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
