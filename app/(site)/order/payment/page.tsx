
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

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
      return "Pay at Shop";
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
    <div className="flex flex-1 flex-col bg-[#f8f8fd] text-slate-800">
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 sm:px-6 lg:px-8">
        {!submitted && (
          <>
            <section className="mb-5 flex flex-col justify-between gap-4 rounded-xl border-b border-slate-200 bg-white px-5 py-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-lg font-bold">
                  Payment &amp; Order Confirmation
                </h1>
                <p className="mt-1 text-[11px] text-slate-500">
                  Review your print order and choose a payment method.
                </p>
              </div>

              <OrderStepper currentStep={4} />
            </section>

            <div className="grid items-start gap-5 lg:grid-cols-[1.1fr_0.9fr]">
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

                <button
                  type="button"
                  onClick={() => router.push("/order/store")}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <ArrowLeft size={14} />
                  Back to Store Selection
                </button>
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

                <button
                  type="button"
                  onClick={placeOrder}
                  disabled={submitted}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-linear-to-r from-blue-900 to-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {paymentType === "payAtShop"
                    ? "Place Order · Pay at Shop"
                    : paymentType === "CashOnDelivery"
                      ? "Place Order · Cash on Delivery"
                      : paymentType === "payAdvance"
                        ? "Continue with 50% Advance"
                        : "Continue to Secure Payment"}
                </button>

                <p className="text-center text-xs leading-5 text-slate-500">
                  Demo checkout only. No online payment is processed
                  by this page.
                </p>
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
