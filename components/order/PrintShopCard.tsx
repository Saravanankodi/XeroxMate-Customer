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
    <section className="w-full rounded-md sm:rounded-xl bg-white p-4 sm:p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="hidden sm:flex size-10 sm:size-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-[#00236F] text-white shadow-sm">
            <Printer size={22} strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-lg sm:text-xl font-semibold sm:leading-6 text-[#131B2E]">
                {name}
              </h2>

              <BadgeCheck
                size={18}
                strokeWidth={2.5}
                className="shrink-0 text-[#005AB6]"
                aria-label="Verified shop"
              />
            </div>

            <div className="sm:mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:leading-3.5">
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

        <a
          href={phoneNumber ? `tel:${phoneNumber}` : undefined}
          aria-disabled={!phoneNumber}
          className={`hidden sm:inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-[#F2F3FF] px-4 py-1 text-xs font-medium leading-4 text-[#00236F] transition-colors sm:self-center ${
            phoneNumber
              ? "hover:bg-[#E5E8FF]"
              : "cursor-not-allowed opacity-70"
          }`}
        >
          <Phone size={14} strokeWidth={2.3} />
          Call Shop
        </a>
      </div>

      <div className="mt-3 sm:mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-lg bg-[#F2F3FF] p-2 sm:p-4">
          <div className="min-w-0 flex items-center gap-1">
            <MapPin
              strokeWidth={2.2}
              className="mt-0.5 w-3 h-3 sm:w-4 sm:h-4 shrink-0 text-[#005AB6]"
            />
            <h3 className="font-heading text-sm sm:text-base font-medium sm:leading-4 text-[#131B2E]">
              Pickup Address
            </h3>
          </div>
          <p className="mt-1 wrap-break-words text-xs leading-4 text-[#444651]">
            {address}
          </p>
        </div>

        <div className="rounded-lg bg-[#F2F3FF] p-4">
          <div className="min-w-0 flex items-center gap-1">
            <Clock
              strokeWidth={2.2}
              className="mt-0.5 w-3 h-3 sm:w-4 sm:h-4 shrink-0 text-[#005AB6]"
            />
            <h3 className="font-heading text-xs font-medium leading-4 text-[#131B2E]">
              Live Queue &amp; Timings
            </h3>
          </div>
          <p className="mt-1 text-xs leading-4 text-[#444651]">
            Open Now:{" "}
            <span className="font-medium text-[#131B2E]">
              {openingHours}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
