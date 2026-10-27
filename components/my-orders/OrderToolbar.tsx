
"use client";

import { CalendarDays, Search, SlidersHorizontal } from "lucide-react";
import StatusTabs from "./StatusTabs";
import { OrderTab } from "@/types/order";


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
    <section className="flex flex-col gap-3 rounded-xl bg-white p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <StatusTabs
        activeTab={activeTab}
        onChange={onTabChange}
        counts={counts}
      />

      <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
        <label className="relative min-w-0 flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444651]"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by Order ID, document or shop..."
            className="h-9 w-full rounded-lg bg-[#F2F3FF] pl-9 pr-3 text-xs outline-none ring-blue-500 placeholder:text-slate-500 focus:ring-2"
          />
        </label>

        <label className="flex h-9 shrink-0 items-center gap-2 rounded-lg bg-[#F2F3FF] px-3 text-xs">
          <CalendarDays size={14} />
          <select
            value={dateRange}
            onChange={(event) => onDateRangeChange(event.target.value)}
            aria-label="Date range"
            className="max-w-32 bg-transparent outline-none"
          >
            <option value="30">Last 30 Days</option>
            <option value="7">Last 7 Days</option>
            <option value="90">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </label>

        <label className="flex h-9 shrink-0 items-center gap-2 rounded-lg bg-[#F2F3FF] px-3 text-xs">
          <SlidersHorizontal size={14} />
          <select
            value={sortOrder}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label="Sort orders"
            className="bg-transparent outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="amount-high">Amount: High to Low</option>
            <option value="amount-low">Amount: Low to High</option>
          </select>
        </label>
      </div>
    </section>
  );
}
