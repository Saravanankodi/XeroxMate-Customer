
"use client";

import { OrderTab } from "@/types/order";



interface StatusTabsProps {
  activeTab: OrderTab;
  onChange: (tab: OrderTab) => void;
  counts: Record<OrderTab, number>;
}

const tabs: { id: OrderTab; label: string }[] = [
  { id: "active", label: "Active Orders" },
  { id: "completed", label: "Completed" },
  { id: "all", label: "All Orders" },
  { id: "cancelled", label: "Cancelled" },
];

export default function StatusTabs({
  activeTab,
  onChange,
  counts,
}: StatusTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter orders by status"
      className="flex w-fit max-w-full gap-1 overflow-x-auto rounded-lg bg-[#F2F3FF] p-1"
    >
      {tabs.map((tab) => {
        const selected = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-xs transition ${
              selected
                ? "bg-white font-bold text-[#00236F] shadow-sm"
                : "font-medium text-[#444651] hover:bg-white/60"
            }`}
          >
            {tab.label}

            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                selected
                  ? "bg-[#0072E4] text-white"
                  : "bg-[#E2E7FF] text-[#444651]"
              }`}
            >
              {counts[tab.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
