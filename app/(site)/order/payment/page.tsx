
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";


import OrderStepper from "@/components/layout/OrderStepper";

import PaymentMethod, {
  type PaymentType,
} from "@/components/order/PaymentMethod";

import PaymentSummary from "@/components/order/PaymentSummary";
import OrderSuccess from "@/components/order/OrderSuccess";
import ShopOperatorNotes from "@/components/order/ShopOperatorNotes";
import { useOrderDraft } from "@/lib/order-draft";
import { addPlacedOrder } from "@/lib/placed-orders";

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

  const [paymentType, setPaymentType] = useState<PaymentType>("payFull");
  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("XM-DEMO-1024");

  const shopName = draft.shopName ?? "Tamil Printers";
  const shopAddress =
    draft.shopAddress ??
    "Bismi Nagar, Baburajapuram, Kumbakonam, Tamil Nadu";
  const fileName = draft.fileName ?? "Document.pdf";
  const pageCount = draft.pageCount;
  const printingCost = draft.printingCost || 1.5;
  const deliveryFee = draft.deliveryFee;
  const wrapperFee = draft.wrapperFee;
  const operatorNotes = draft.operatorNotes ?? "";
  const total = printingCost + deliveryFee + wrapperFee;
  const paidOnline = paymentType === "payAdvance" ? total / 2 : 0;

  function placeOrder() {
    if (submitted) return;

    const nextOrderId = `XM-${Date.now().toString().slice(-6)}`;
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
      rating: 4.8,
      location: shopAddress,
      total,
      balanceDue: Math.max(0, total - paidOnline),
      paymentMethod: getPaymentLabel(paymentType),
      pickupPin: String(Math.floor(1000 + Math.random() * 9000)),
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
      <main className="mx-auto w-full max-w-360 flex-1 px-4 py-5 sm:px-6 lg:px-8">
        {!submitted && (
          <>
            <section className="mb-5 flex flex-col justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 md:flex-row md:items-center">
              <div>
                <h1 className="text-lg font-bold">
                  Payment & Order Confirmation
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
                  onChange={(value) => updateDraft({ operatorNotes: value })}
                />
                <div className="flex items-start gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                  <LockKeyhole
                    size={16}
                    className="mt-0.5 shrink-0 text-emerald-700"
                  />
                  <p className="text-xs leading-5 text-emerald-900">
                    Secure checkout: real online payments will require a
                    verified payment gateway. No payment is collected by
                    this demo page.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push("/order/store")}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-600 hover:bg-slate-50"
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
                />
                <button
                  type="button"
                  onClick={placeOrder}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-linear-to-r from-blue-900 to-blue-600 px-4 text-sm font-bold text-white shadow-sm transition hover:brightness-110"
                >
                  {paymentType === "payAtShop"
                    ? "Place Order · Pay at Shop"
                    : paymentType === "CashOnDelivery"
                      ? "Place Order · Cash on Delivery"
                      : paymentType === "payAdvance"
                        ? "Continue with 50% Advance"
                        : "Continue to Secure Payment"}
                </button>
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
