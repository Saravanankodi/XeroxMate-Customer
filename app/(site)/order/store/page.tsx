
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Store, Info } from "lucide-react";


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
        <section className="mb-4 hidden sm:flex flex-col justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Select Nearby Print Shop
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-4 text-slate-500">
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

              <span className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={12} className="text-blue-600" />
                Sample nearby results
              </span>
            </div>

            <div className="space-y-3">
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

            <div className="mt-4 flex items-start gap-2 rounded-lg border border-sky-100 bg-sky-50 p-3">
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
          <div className="lg:sticky lg:top-5">
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
