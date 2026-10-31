
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CreditCard } from "lucide-react";

import OrderStepper from "@/components/layout/OrderStepper";
import PaymentMethod, {
  type PaymentType,
} from "@/components/order/PaymentMethod";
import PaymentSummary from "@/components/order/PaymentSummary";
import OrderSuccess from "@/components/order/OrderSuccess";
import ShopOperatorNotes from "@/components/order/ShopOperatorNotes";
import PrintShopCard from "@/components/order/PrintShopCard";

import { useOrderDraft } from "@/lib/order-draft";
import { addPlacedOrder } from "@/lib/placed-orders";

const CAMPUS_SUBSIDY = 0.04;
const PLATFORM_FEE = 0;

function getPaymentLabel(paymentType: PaymentType) {
  switch (paymentType) {
    case "payAtShop":
      return "Pickup Pay";
    case "CashOnDelivery":
      return "Cash on Delivery";
    case "payAdvance":
      return "50% Advance · Payment not processed";
    default:
      return "UPI selected · Payment not processed";
  }
}

export default function PaymentPage() {
  const router = useRouter();
  const { draft, updateDraft, resetDraft } = useOrderDraft();

  const [paymentType, setPaymentType] =
    useState<PaymentType>("payFull");
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("XM-DEMO-1024");

  const shopName = draft.shopName ?? "Tamil Printers";
  const shopAddress =
    draft.shopAddress ??
    "No.4 Bismi Nagar, Baburajapuram, Kumbakonam, Tamil Nadu 612302";

  const fileName = draft.fileName ?? "Document.pdf";
  const pageCount = draft.pageCount ?? 1;
  const printingCost = draft.printingCost || 1.5;
  const deliveryFee = draft.deliveryFee ?? 0;
  const wrapperFee = draft.wrapperFee ?? 0;
  const operatorNotes = draft.operatorNotes ?? "";

  // Keep the calculation consistent with PaymentSummary.
  const subtotal =
    printingCost + deliveryFee + wrapperFee + PLATFORM_FEE;

  const subsidy = Math.min(CAMPUS_SUBSIDY, subtotal);
  const total = Math.max(0, subtotal - subsidy);

  const paidOnline =
    paymentType === "payAdvance" ? total / 2 : 0;

  const fulfillmentMode =
    draft.fulfillment === "delivery"
      ? "Home Delivery"
      : "Pickup At Shop";

  function placeOrder() {
    if (submitted) return;

    const nextOrderId = `XM-${Date.now()
      .toString()
      .slice(-6)}`;

    const shopInitials = shopName
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    addPlacedOrder({
      id: nextOrderId,
      status: "awaiting_acceptance",
      submittedAt: new Date().toISOString(),
      shopName,
      shopInitials,
      shopAddress,
      rating: 5.0,
      location: shopAddress,
      total,
      balanceDue: Math.max(0, total - paidOnline),
      paymentMethod: getPaymentLabel(paymentType),
      pickupPin: String(
        Math.floor(1000 + Math.random() * 9000)
      ),
      pickupToken: `${nextOrderId}-TN-KUM`,
      documentName: fileName,
      documentPages: pageCount,
      documentSize: draft.fileSize
        ? `${(draft.fileSize / (1024 * 1024)).toFixed(2)} MB`
        : undefined,
      documentCost: printingCost,
      deliveryFee,
      wrapperFee,
      settings: draft.settings,
      fulfillment: draft.fulfillment,
    });

    setOrderId(nextOrderId);
    setSubmitted(true);
  }

  return (
    <div className="flex flex-1 flex-col bg-[#FAF8FF] text-[#131B2E]">
      <main className="mx-auto w-full max-w-screen flex-1 px-4 py-5 sm:px-6 lg:px-8">
        {!submitted && (
          <>
            <section className="mb-5 flex flex-col justify-between gap-4 rounded-xl border-b border-[rgba(226,232,240,0.8)] bg-white px-5 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] md:flex-row md:items-center">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1E3A8A] text-[#90A8FF]">
                  <CreditCard size={20} strokeWidth={2} />
                </div>

                <div>
                  <h1 className="font-heading text-2xl font-bold leading-7 tracking-[-0.45px] text-[#0F172A]">
                    Review &amp; Instant Pay
                  </h1>
                  <p className="mt-1 text-xs leading-4 text-[#444651]">
                    Order ID: #{orderId}
                  </p>
                </div>
              </div>

              <OrderStepper currentStep={4} />
            </section>

            <div className="grid items-start gap-6 lg:grid-cols-[7fr_5fr]">
              <div className="space-y-4">
                <PaymentMethod
                  value={paymentType}
                  onChange={setPaymentType}
                />

                <ShopOperatorNotes
                  value={operatorNotes}
                  onChange={(value) =>
                    updateDraft({ operatorNotes: value })
                  }
                />

                <PrintShopCard
                  name={shopName}
                  rating={5.0}
                  reviewCount={142}
                  partnerLabel="Anna Univ Partner Node"
                  phoneNumber="+919876543210"
                  address={shopAddress}
                  openingHours="9:00 AM – 11:00 PM"
                />
              </div>

              <div className="space-y-4 lg:sticky lg:top-5">
                <PaymentSummary
                  shopName={shopName}
                  shopAddress={shopAddress}
                  fileName={fileName}
                  pageCount={pageCount}
                  printingCost={printingCost}
                  deliveryFee={deliveryFee}
                  wrapperFee={wrapperFee}
                  copyCount={1}
                  printMode="B/W Duplex"
                  fulfillmentMode={fulfillmentMode}
                  deliveryAddress={
                    draft.fulfillment === "delivery"
                      ? shopAddress
                      : "—"
                  }
                  paymentScheme={getPaymentLabel(paymentType)}
                  operatorInstructions={operatorNotes || "—"}
                  subsidy={subsidy}
                  platformFee={PLATFORM_FEE}
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => router.push("/order/store")}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2F3FF] px-4 py-2 text-base font-bold leading-5 text-[#131B2E] transition hover:bg-[#E5E8FF]"
                  >
                    <ArrowLeft size={16} strokeWidth={2.2} />
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={placeOrder}
                    disabled={submitted}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00236F] px-6 py-2 font-heading text-base font-semibold leading-4 text-white shadow-[0px_4px_6px_rgba(0,35,111,0.2)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Confirm &amp; Place Order
                    <ArrowRight size={16} strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {submitted && (
          <div className="py-8">
            <OrderSuccess
              orderId={orderId}
              shopName={shopName}
              paymentLabel={getPaymentLabel(paymentType)}
              fileName={fileName}
              pageCount={pageCount}
              printingCost={printingCost}
              deliveryFee={deliveryFee}
              wrapperFee={wrapperFee}
              paidOnline={paidOnline}
              onViewOrders={() => {
                resetDraft();
                router.push("/my-orders");
              }}
              onBackHome={() => {
                resetDraft();
                router.push("/");
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
