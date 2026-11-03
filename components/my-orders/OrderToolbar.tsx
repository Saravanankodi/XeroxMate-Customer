
"use client";

import { CalendarDays, Search, SlidersHorizontal } from "lucide-react";
import StatusTabs from "./StatusTabs";
import { OrderTab } from "@/types/order";
import { Select } from "@/components/ui";


interface OrderToolbarProps {
  activeTab: OrderTab;
  onTabChange: (tab: OrderTab) => void;
  counts: Record<OrderTab, number>;
  search: string;
  onSearchChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  sortOrder: string;
  onSortChange: (value: string) => void;
}

export default function OrderToolbar({
  activeTab,
  onTabChange,
  counts,
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  sortOrder,
  onSortChange,
}: OrderToolbarProps) {
  return (
    <section className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <StatusTabs
        activeTab={activeTab}
        onChange={onTabChange}
        counts={counts}
      />

      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
        <label className="relative min-w-0 flex-1">
          <Search
            size={13.5}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444651]"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by Order ID (e.g. OMX-3547), document or shop..."
            className="h-8.25 w-full rounded-lg bg-[#F2F3FF] py-2.25 pl-9 pr-3 text-[11px] leading-3.5 text-[#444651] outline-none ring-blue-500 placeholder:text-[#444651]/60 focus:ring-2"
          />
        </label>

        <div className="hidden sm:flex items-center gap-2">
          <CalendarDays size={12} className="text-[#444651]" />
          <Select
            value={dateRange}
            onChange={(event) => onDateRangeChange(event.target.value)}
            aria-label="Date range"
            containerClassName="w-auto"
            className="h-8 text-xs font-medium text-[#131B2E] bg-[#F2F3FF] !px-0"
            options={[
              { label: "Last 30 Days", value: "30" },
              { label: "Last 7 Days", value: "7" },
              { label: "Last 90 Days", value: "90" },
              { label: "All Time", value: "all" },
            ]}
          />
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <SlidersHorizontal size={12} className="text-[#444651]" />
          <Select
            value={sortOrder}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label="Sort orders"
            containerClassName="w-auto"
            className="h-8 text-xs font-medium text-[#131B2E] bg-[#F2F3FF] !px-0"
            options={[
              { label: "Newest", value: "newest" },
              { label: "Oldest", value: "oldest" },
              { label: "Amount: High to Low", value: "amount-high" },
              { label: "Amount: Low to High", value: "amount-low" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
