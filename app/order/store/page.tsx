
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Store, Info } from "lucide-react";


import Footer from "@/components/layout/Footer";
import OrderStepper from "@/components/layout/OrderStepper";

import StoreSearch from "@/components/order/StoreSearch";
import StoreCard from "@/components/order/StoreCard";
import OrderSummary from "@/components/order/OrderSummary";
import FulfillmentModal from "@/components/order/FulfillmentModal";
import { type FulfillmentMode, type PrintShop, sampleShops } from "@/data/store-types";
import { Header } from "@/components/layout/Header";



export default function StoreSelectionPage() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [selectedShop, setSelectedShop] = useState<PrintShop>(
    sampleShops[0],
  );
  const [modalOpen, setModalOpen] = useState(false);

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
    setSelectedShop(shop);
  }

  function handleFulfillmentConfirm(details: {
    fulfillment: FulfillmentMode;
    deliveryAddress: string;
    wrapper: boolean;
  }) {
    // Temporary demonstration: save the selection for this browser tab.
    // Replace this with shared order state or a server-side order draft.
    try {
      sessionStorage.setItem(
        "xeroxmate-fulfillment",
        JSON.stringify({
          shopId: selectedShop.id,
          fulfillment: details.fulfillment,
          deliveryAddress: details.deliveryAddress,
          wrapper: details.wrapper,
        }),
      );
    } catch {
      // Continue navigation even if browser storage is unavailable.
    }

    setModalOpen(false);
    router.push("/order/payment");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8fd] text-slate-800">
      <Header/>

      <main className="mx-auto w-full max-w-360 flex-1 px-4 py-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <section className="mb-4 flex flex-col justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Select Nearby Print Shop
            </h1>

            <p className="mt-1 max-w-2xl text-[11px] leading-4 text-slate-500">
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
              <p className="text-[10px] text-slate-500">
                {filteredShops.length} print{" "}
                {filteredShops.length === 1 ? "shop" : "shops"} found
              </p>

              <span className="flex items-center gap-1 text-[10px] text-slate-500">
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

              <p className="text-[10px] leading-4 text-slate-600">
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
              fileName="Document.pdf"
              pageCount={2}
              onContinue={() => setModalOpen(true)}
              onBack={() => router.push("/order")}
            />
          </div>
        </div>
      </main>

      <Footer />

      {/* Pickup / delivery modal */}
      <FulfillmentModal
        open={modalOpen}
        shop={selectedShop}
        fileName="Document.pdf"
        pageCount={2}
        onClose={() => setModalOpen(false)}
        onConfirm={handleFulfillmentConfirm}
      />
    </div>
  );
}
