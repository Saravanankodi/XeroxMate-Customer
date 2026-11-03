
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Store, Info, X, ReceiptText } from "lucide-react";


import OrderStepper from "@/components/layout/OrderStepper";

import StoreSearch from "@/components/order/StoreSearch";
import StoreCard from "@/components/order/StoreCard";
import OrderSummary from "@/components/order/OrderSummary";
import FulfillmentModal from "@/components/order/FulfillmentModal";
import {
  DELIVERY_FEE,
  WRAPPER_FEE,
  type FulfillmentMode,
  type PrintShop,
  sampleShops,
} from "@/data/store-types";
import { useOrderDraft } from "@/lib/order-draft";

export default function StoreSelectionPage() {
  const router = useRouter();
  const { draft, updateDraft } = useOrderDraft();

  const [search, setSearch] = useState("");
  const [manualShopId, setManualShopId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);

  const selectedShop =
    sampleShops.find(
      (shop) => shop.id === (manualShopId ?? draft.shopId),
    ) ?? sampleShops[0];

  const filteredShops = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sampleShops;

    return sampleShops.filter((shop) =>
      [
        shop.name,
        shop.address,
        shop.locality,
        shop.distance,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [search]);

  function handleShopSelect(shop: PrintShop) {
    setManualShopId(shop.id);
  }

  function handleFulfillmentConfirm(details: {
    fulfillment: FulfillmentMode;
    deliveryAddress: string;
    wrapper: boolean;
  }) {
    updateDraft({
      shopId: selectedShop.id,
      shopName: selectedShop.name,
      shopAddress: selectedShop.address,
      fulfillment: details.fulfillment,
      deliveryAddress: details.deliveryAddress,
      wrapper: details.wrapper,
      deliveryFee: details.fulfillment === "delivery" ? DELIVERY_FEE : 0,
      wrapperFee: details.wrapper ? WRAPPER_FEE : 0,
      printingCost:
        selectedShop.printCost *
        draft.pageCount *
        (draft.settings?.quantity ?? 1),
    });

    setModalOpen(false);
    router.push("/order/payment");
  }

  return (
    <div className="flex flex-1 flex-col bg-[#f8f8fd] text-slate-800">
      <main className="mx-auto w-full max-w-screen flex-1 px-4 py-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <section className="mb-2 sm:mb-4 flex flex-col justify-between gap-3 sm:border-b border-slate-200 sm:bg-white sm:px-4 sm:py-3 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Select Nearby Print Shop
            </h1>

            <p className="mt-1 hidden sm:block max-w-2xl text-sm leading-4 text-slate-500">
              Showing verified XeroxMate stations equipped with duplex
              laser hardware. Estimated subtotal is calculated using
              sample vendor pricing.
            </p>
          </div>

          <OrderStepper currentStep={3} />
        </section>

        {/* Main content */}
        <div className="grid items-start gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left: search and nearby shops */}
          <section className="min-w-0">
            <StoreSearch value={search} onChange={setSearch} />

            <div className="mb-3 mt-3 flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                {filteredShops.length} print{" "}
                {filteredShops.length === 1 ? "shop" : "shops"} found
              </p>

              <span className="hidden sm:flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={12} className="text-blue-600" />
                Sample nearby results
              </span>
            </div>

            <div className="space-y-3 pb-20 lg:pb-0">
              {filteredShops.map((shop) => (
                <StoreCard
                  key={shop.id}
                  shop={shop}
                  selected={selectedShop.id === shop.id}
                  onSelect={handleShopSelect}
                />
              ))}

              {filteredShops.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
                  <Store
                    size={26}
                    className="mx-auto text-slate-400"
                  />

                  <h2 className="mt-3 text-sm font-semibold">
                    No print shops found
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Try another shop name, street, or locality.
                  </p>

                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-4 rounded-lg bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>

            <div className="hidden mt-4 sm:flex items-start gap-2 rounded-lg border border-sky-100 bg-sky-50 p-3">
              <Info
                size={14}
                className="mt-0.5 shrink-0 text-sky-700"
              />

              <p className="text-xs leading-4 text-slate-600">
                Shop locations, reviews, hours, and prices shown here
                are demonstration data. Connect your shop API for
                verified locations and live availability.
              </p>
            </div>
          </section>

          {/* Right: selected shop and order summary */}
          <div className="hidden lg:block lg:sticky lg:top-5">
            <OrderSummary
              shop={selectedShop}
              fileName={draft.fileName ?? "Document.pdf"}
              pageCount={draft.pageCount}
              quantity={draft.settings?.quantity ?? 1}
              onContinue={() => setModalOpen(true)}
              onBack={() => router.push("/order")}
            />
          </div>
        </div>
      </main>

      {/* Mobile Order Summary Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-[60]">
        <button
          type="button"
          onClick={() => setSummaryOpen(true)}
          className="flex h-11 w-full items-center justify-between rounded-lg bg-linear-to-r from-blue-900 to-blue-600 px-4 text-white font-semibold shadow-sm"
        >
          <span className="flex items-center gap-2">
            <ReceiptText size={18} />
            View Order Summary
          </span>
          <span className="text-lg font-bold">
            ₹{Math.max(0, selectedShop.printCost * draft.pageCount * (draft.settings?.quantity ?? 1)).toFixed(2)}
          </span>
        </button>
      </div>

      {/* Mobile Order Summary Popup */}
      {summaryOpen && (
        <div className="lg:hidden fixed inset-0 z-[70] flex items-end justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSummaryOpen(false)}
          />
          <div className="relative w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white shadow-xl animate-in slide-in-from-bottom">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3 rounded-t-2xl">
              <h3 className="text-base font-bold text-slate-900">Order Summary</h3>
              <button
                type="button"
                onClick={() => setSummaryOpen(false)}
                className="rounded-lg p-1.5 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="p-4">
              <OrderSummary
                shop={selectedShop}
                fileName={draft.fileName ?? "Document.pdf"}
                pageCount={draft.pageCount}
                quantity={draft.settings?.quantity ?? 1}
                onContinue={() => {
                  setSummaryOpen(false);
                  setModalOpen(true);
                }}
                onBack={() => {
                  setSummaryOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Pickup / delivery modal */}
      <FulfillmentModal
        open={modalOpen}
        shop={selectedShop}
        fileName={draft.fileName ?? "Document.pdf"}
        pageCount={draft.pageCount}
        quantity={draft.settings?.quantity ?? 1}
        wrapperDefault={draft.wrapper}
        onClose={() => setModalOpen(false)}
        onConfirm={handleFulfillmentConfirm}
      />
    </div>
  );
}
