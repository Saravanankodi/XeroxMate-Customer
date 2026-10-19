
"use client";

import { PrintShop } from "@/data/store-types";
import {
  Check,
  Clock3,
  MapPin,
  Store,
  Truck,
} from "lucide-react";



type StoreCardProps = {
  shop: PrintShop;
  selected: boolean;
  onSelect: (shop: PrintShop) => void;
};

export default function StoreCard({
  shop,
  selected,
  onSelect,
}: StoreCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(shop)}
      aria-pressed={selected}
      className={`w-full overflow-hidden rounded-xl border text-left transition ${
        selected
          ? "border-blue-600 bg-indigo-50/60 ring-1 ring-blue-200"
          : "border-slate-100 bg-white hover:border-blue-200 hover:shadow-sm"
      } ${!shop.open ? "opacity-75" : ""}`}
    >
      <div className="p-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-semibold ${
              shop.open
                ? "bg-teal-100 text-teal-800"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {shop.open ? "Open Now" : "Closed Currently"}
          </span>

          <span className="text-[10px] text-slate-500">
            {shop.open ? shop.openingHours : shop.openingHours}
          </span>

          <span className="ml-auto flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] text-slate-600">
            <span className="text-amber-500">★</span>
            <b>{shop.rating.toFixed(1)}</b>
            <span>({shop.reviews} reviews)</span>
          </span>
        </div>

        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-base font-bold text-slate-800">
              {shop.name}
            </h2>

            <p className="mt-1.5 flex items-start gap-1.5 text-[10px] leading-4 text-slate-500">
              <MapPin
                size={13}
                className="mt-0.5 shrink-0 text-blue-700"
              />
              <span>{shop.address}</span>
            </p>
          </div>

          {selected && (
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-700 text-white">
              <Check size={13} />
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 bg-indigo-50/70 px-4 py-3">
        <div className="flex items-center gap-2">
          {shop.fulfillment.includes("delivery") ? (
            <Truck size={14} className="text-slate-500" />
          ) : (
            <Store size={14} className="text-slate-500" />
          )}

          <div>
            <p className="text-[10px] text-slate-500">
              {shop.fulfillment.includes("delivery")
                ? "Pickup / Delivery"
                : "Fulfilment"}
            </p>
            <p className="text-[11px] font-semibold text-slate-700">
              {shop.fulfillment.includes("delivery")
                ? "Both Enabled"
                : "Pickup Only"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-[9px] font-medium text-slate-500">
            ESTIMATED TOTAL
          </p>
          <p className="text-sm font-extrabold text-blue-950">
            ₹{shop.printCost.toFixed(2)}
          </p>
        </div>
      </div>

      {!shop.open && (
        <div className="flex items-center gap-1 px-4 py-2 text-[10px] text-slate-500">
          <Clock3 size={12} />
          You can select this shop, but fulfilment must be confirmed.
        </div>
      )}
    </button>
  );
}
