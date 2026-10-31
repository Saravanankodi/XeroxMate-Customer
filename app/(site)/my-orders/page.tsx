
"use client";

import { useMemo, useState } from "react";
import { Lock, Ticket } from "lucide-react";

import PageHeading from "@/components/my-orders/PageHeading";
import { OrderTab, PrintOrder, sampleOrders } from "@/types/order";
import OrderToolbar from "@/components/my-orders/OrderToolbar";
import OrderCard from "@/components/my-orders/OrderCard";
import { usePlacedOrders } from "@/lib/placed-orders";
import {
  markOrderCancelled,
  useCancelledOrderIds,
} from "@/lib/cancelled-orders";


function isActive(order: PrintOrder) {
  return !["completed", "cancelled"].includes(order.status);
}

function isCancelable(order: PrintOrder) {
  return ["awaiting_acceptance", "processing"].includes(order.status);
}

export default function MyOrdersPage() {
  const placedOrders = usePlacedOrders();
  const cancelledIds = useCancelledOrderIds();
  const [activeTab, setActiveTab] = useState<OrderTab>("active");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("30");
  const [sortOrder, setSortOrder] = useState("newest");

  const orders = useMemo(() => {
    const base = [...placedOrders, ...sampleOrders];

    return base.map((order) =>
      cancelledIds.includes(order.id)
        ? {
            ...order,
            status: "cancelled" as const,
            pickupPin: undefined,
            pickupToken: undefined,
          }
        : order,
    );
  }, [placedOrders, cancelledIds]);

  const counts: Record<OrderTab, number> = {
    active: orders.filter(isActive).length,
    completed: orders.filter((o) => o.status === "completed").length,
    all: orders.length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    const rangeDays = dateRange === "all" ? null : Number(dateRange);
    const latestSubmittedAt = orders.reduce(
      (latest, order) => Math.max(latest, Date.parse(order.submittedAt)),
      0,
    );
    const cutoff =
      rangeDays && !Number.isNaN(rangeDays)
        ? latestSubmittedAt - rangeDays * 24 * 60 * 60 * 1000
        : null;

    const filtered = orders.filter((order) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && isActive(order)) ||
        (activeTab === "completed" && order.status === "completed") ||
        (activeTab === "cancelled" && order.status === "cancelled");

      const matchesSearch = [
        order.id,
        order.shopName,
        order.location,
      ].some((value) => value.toLowerCase().includes(query));

      const submittedAt = Date.parse(order.submittedAt);
      const matchesDate =
        !cutoff || Number.isNaN(submittedAt) || submittedAt >= cutoff;

      return matchesTab && matchesSearch && matchesDate;
    });

    return [...filtered].sort((a, b) => {
      if (sortOrder === "amount-high") {
        return b.total - a.total;
      }

      if (sortOrder === "amount-low") {
        return a.total - b.total;
      }

      const aDate = Date.parse(a.submittedAt);
      const bDate = Date.parse(b.submittedAt);

      return sortOrder === "oldest"
        ? aDate - bDate
        : bDate - aDate;
    });
  }, [orders, activeTab, search, dateRange, sortOrder]);

  function refreshOrders() {
    window.location.reload();
  }

  function cancelOrder(id: string) {
    markOrderCancelled(id);
  }

  const featuredOrder =
    orders.find((order) =>
      activeTab === "active"
        ? isActive(order)
        : activeTab === "completed"
          ? order.status === "completed"
          : activeTab === "cancelled"
            ? order.status === "cancelled"
            : true,
    ) ?? null;

  const activeJobsHeading =
    activeTab === "active"
      ? "Active Campus Print Jobs"
      : activeTab === "completed"
        ? "Completed Print Jobs"
        : activeTab === "cancelled"
          ? "Cancelled Print Orders"
          : "All Print Orders";

  return (
    <div className="flex flex-1 flex-col bg-[#FAF8FF]">
      <main className="mx-auto w-full max-w-screen flex-1 space-y-4 px-4 py-6 sm:px-6 lg:px-8">
        <PageHeading onRefresh={refreshOrders} />

        <OrderToolbar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          counts={counts}
          search={search}
          onSearchChange={setSearch}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
        />

        <section className="grid grid-cols-1 items-start gap-5">
          <div className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-4 px-3">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#0072E4]" />
                <h2 className="font-heading text-lg leading-6 font-bold text-[#00236F]">
                  {activeJobsHeading}
                </h2>
              </div>

              <span className="text-xs leading-3.5 font-semibold text-[#444651]">
                Auto-syncing every 5s
              </span>
            </div>

            <div className="space-y-4 w-full grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-5 gap-y-2">
                {filteredOrders.length ? (
                    filteredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      canCancel={isCancelable(order)}
                      onCancel={cancelOrder}
                    />
                    ))
                ) : (
                    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                    <p className="font-semibold text-slate-800">
                        No orders found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                        Try another status or search term.
                    </p>
                    </div>
                )}
            </div>
          </div>

          {/* <aside className="lg:col-span-4">
            <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Ticket size={18.33} className="shrink-0 text-[#005AB6]" />
                  <h2 className="font-heading text-base leading-5.5 font-bold text-[#00236F]">
                    PickUp Express Pass
                  </h2>
                </div>

                <span className="rounded-full bg-[#D7E3FF] px-2 py-0.5 text-xs leading-3.5 font-semibold text-[#001B3F]">
                  Active
                </span>
              </div>

              <p className="text-xs leading-5 text-[#444651]">
                {featuredOrder
                  ? `Flash this pass at ${featuredOrder.shopName} to bypass queues and claim spool without repeating file names.`
                  : "Upload a document to generate your pickup pass."}
              </p>

              <div className="flex flex-col items-center gap-2 rounded-xl bg-[#F2F3FF] p-4 text-center">
                <p className="text-xs leading-3.5 font-semibold tracking-[0.55px] text-[#444651] uppercase">
                  One-Time Pickup PIN
                </p>

                <div className="flex items-center gap-2 rounded-lg bg-white px-6 py-2 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.05)]">
                  {(featuredOrder?.pickupPin ?? "----").split("").map((digit, index) => (
                    <span
                      key={`${digit}-${index}`}
                      className="font-heading text-4xl leading-11 font-bold tracking-[3.6px] text-[#00236F]"
                    >
                      {digit}
                    </span>
                  ))}
                </div>

                <div className="mt-1 flex items-center gap-0.75 opacity-[0.85]">
                  {[4, 8, 2, 6, 4, 12, 2, 4, 8, 2, 6, 8, 4, 12, 4].map(
                    (width, index) => (
                      <span
                        key={index}
                        style={{ width }}
                        className="h-8 bg-[#00236F]"
                      />
                    ),
                  )}
                </div>

                <p className="text-sm leading-4 text-[#444651]">
                  TOKEN: {featuredOrder?.pickupToken ?? "N/A"}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                  <Lock size={10.67} className="shrink-0 text-[#00312C]" />
                  <p className="text-xs leading-4 text-[#444651]">
                    Shopkeeper verified only
                  </p>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center text-xs leading-4 font-semibold text-[#005AB6] transition hover:underline"
                >
                  Save to Apple Wallet
                </button>
              </div>
            </div>
          </aside> */}
        </section>
      </main>
    </div>
  );
}
