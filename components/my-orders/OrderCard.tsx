"use client";

import Link from "next/link";
import { Star, Ticket, X } from "lucide-react";

type OrderCardData = {
  id: string;
  shopName: string;
  location: string;
  status: string;
  submittedAt?: string;
  total: number;
  balanceDue?: number;
  paymentMethod: string;
  pickupPin?: string | number | null;
};

type OrderCardProps = {
  order: OrderCardData;
  canCancel?: boolean;
  onCancel?: (id: string) => void;
};

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatSubmittedAt(value?: string) {
  if (!value) return "just now";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const ist = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
  const day = String(ist.getUTCDate()).padStart(2, "0");
  const month = MONTHS[ist.getUTCMonth()];
  const year = ist.getUTCFullYear();
  const minutes = String(ist.getUTCMinutes()).padStart(2, "0");
  const hours24 = ist.getUTCHours();
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours = hours24 % 12 || 12;

  return `${day} ${month} ${year} at ${hours}:${minutes} ${period}`;
}

export default function OrderCard({
  order,
  canCancel = false,
  onCancel,
}: OrderCardProps) {
  const normalizedStatus = order.status.toLowerCase();
  const statusTone = normalizedStatus.includes("cancel")
    ? "bg-rose-100 text-rose-800"
    : normalizedStatus.includes("completed") ||
        normalizedStatus.includes("ready")
      ? "bg-emerald-100 text-emerald-800"
      : "bg-[#E2E7FF] text-[#92400E]";
  const statusDot = normalizedStatus.includes("cancel")
    ? "bg-rose-600"
    : normalizedStatus.includes("completed") ||
        normalizedStatus.includes("ready")
      ? "bg-emerald-600"
      : "bg-[#005AB6]";

  const shopInitials = order.shopName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const balanceDue = order.balanceDue ?? 0;

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
      <div className="h-1.5 bg-linear-to-r from-[#005AB6] via-[#0072E4] to-[#6BD8CB]" />

      <div className="flex flex-col gap-4 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-[22px] leading-7 font-bold tracking-[-0.55px] text-[#00236F]">
              <Link
                href={`/my-orders/${order.id}`}
                className="hover:text-blue-700 hover:underline"
              >
                {order.id}
              </Link>
            </h3>

            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-footer text-xs leading-4 font-bold capitalize ${statusTone}`}
            >
              <span className={`size-2 rounded-full ${statusDot}`} />
              {order.status.replaceAll("_", " ")}
            </span>

            {/* {balanceDue > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#FFFBEB] px-2.5 py-0.5 text-xs leading-[14px] font-semibold text-[#92400E]">
                <span className="size-3 rounded-full border-[1.5px] border-[#92400E]" />
                Balance Due: ₹{balanceDue.toFixed(2)}
              </span>
            )} */}
          </div>

          <div className="flex items-center gap-2">
            <span className="size-3.5 rounded-full border-[1.34px] border-[#005AB6]" />
            <p className="text-sm leading-4 text-[#444651]">
              Submitted {formatSubmittedAt(order.submittedAt)}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-center gap-2.5 rounded-xl bg-[#F2F3FF] px-3 py-2 sm:max-w-52">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#1E3A8A] text-base leading-6 font-bold text-[#90A8FF]">
            {shopInitials}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <p className="truncate font-heading text-xs leading-4 font-bold text-[#131B2E]">
                {order.shopName}
              </p>
              <Star size={11.67} className="shrink-0 fill-[#F59E0B] text-[#F59E0B]" />
              <p className="text-xs leading-3.5 font-semibold text-[#444651]">
                5.0
              </p>
            </div>
            <p className="truncate text-xs leading-4 text-[#444651]">
              {order.location}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-4 mb-4 rounded-xl bg-[#F2F3FF]/60 px-4 pt-2 pb-4 sm:mx-6 sm:mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#FEF3C7] text-xl font-bold text-[#78350F]">
              ₹
            </div>

            <div className="flex min-w-0 flex-wrap items-end gap-2">
              <p className="font-heading text-base leading-5.5 font-bold text-[#00236F]">
                Total: ₹{order.total.toFixed(2)}
              </p>

              {/* <span className="inline-block rounded bg-[#FEF3C7]/80 px-2 py-0.5 text-xs leading-3.5 font-semibold text-[#92400E]">
                {order.paymentMethod}
              </span> */}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* {canCancel && onCancel && (
              <button
                type="button"
                onClick={() => onCancel(order.id)}
                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#EAEDFF] px-3 py-2 text-xs leading-4 font-medium text-[#444651] transition hover:bg-[#DDE3FF]"
              >
                <X size={9.33} className="text-[#444651]" />
                Cancel Order
              </button>
            )} */}

            <Link
              href={`/my-orders/${order.id}`}
              className="inline-flex h-8 items-center gap-2 rounded-lg bg-primary px-4 py-2 font-heading text-xs leading-4 font-semibold text-white! shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition hover:brightness-110"
            >
              <Ticket size={13.5} className="text-white" />
              {order.pickupPin
                ? `Show Pickup Pass (#${order.pickupPin})`
                : "View Details"}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
