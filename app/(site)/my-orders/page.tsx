
"use client";

import { useMemo, useState } from "react";

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
      <main className="mx-auto w-full max-w-360 flex-1 space-y-4 px-4 py-6 sm:px-6 lg:px-8">
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

        <section className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-8">
            <div className="mb-4 flex items-center justify-between px-2">
              <h2 className="font-heading text-lg font-bold text-[#00236F]">
                {activeJobsHeading}
              </h2>

              <span className="text-xs text-slate-600">
                {filteredOrders.length} shown
              </span>
            </div>

            <div className="space-y-5">
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
                    <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
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

          <aside className="lg:col-span-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <h2 className="font-heading text-lg font-bold text-[#00236F]">
                PickUp Express Pass
              </h2>

              <p className="mt-3 text-sm leading-5 text-slate-600">
                {featuredOrder
                  ? `Flash this pass at ${featuredOrder.shopName} to bypass queues and claim your print job.`
                  : "Upload a document to generate your pickup pass."}
              </p>

              <div className="mt-5 rounded-xl bg-[#F2F3FF] p-5 text-center">
                <p className="text-xs font-semibold tracking-wider text-slate-600">
                  ONE-TIME PICKUP PIN
                </p>

                <p className="mt-3 inline-block rounded-lg bg-white px-5 py-2 font-mono text-3xl font-bold tracking-[0.3em] text-[#00236F]">
                  {featuredOrder?.pickupPin ?? "----"}
                </p>

                <p className="mt-3 text-xs text-slate-600">
                  TOKEN: {featuredOrder?.pickupToken ?? "N/A"}
                </p>
              </div>

              <p className="mt-4 text-xs text-slate-500">
                🔒 Shopkeeper verified only
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
