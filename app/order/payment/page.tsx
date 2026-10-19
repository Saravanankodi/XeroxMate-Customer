
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, LockKeyhole } from "lucide-react";


import Footer from "@/components/layout/Footer";
import OrderStepper from "@/components/layout/OrderStepper";

import PaymentMethod, {
  type PaymentType,
} from "@/components/order/PaymentMethod";

import PaymentSummary from "@/components/order/PaymentSummary";
import OrderSuccess from "@/components/order/OrderSuccess";
import { Header } from "@/components/layout/Header";
import ShopOperatorNotes from "@/components/order/ShopOperatorNotes";

export default function PaymentPage() {
  const router = useRouter();

  const [paymentType, setPaymentType] = useState<PaymentType>("payFull");
  const [submitted, setSubmitted] = useState(false);
  const [operatorNotes, setOperatorNotes] = useState("");

  // Demo values; connect these to the shared order state and server quote.
  const shopName = "Tamil Printers";
  const shopAddress =
    "Bismi Nagar, Baburajapuram, Kumbakonam, Tamil Nadu";
  const fileName = "Document.pdf";
  const pageCount = 2;
  const printingCost = 1.5;
  const deliveryFee = 0;
  const wrapperFee = 0;
  const orderId = "XM-DEMO-1024";

  function placeOrder() {
    // This only demonstrates the frontend success state.
    // Real payment/order creation must be verified by your backend.
    setSubmitted(true);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8fd] text-slate-800">
      <Header />

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
                    onChange={setOperatorNotes}
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
                paymentLabel={
                    paymentType === "payAtShop"
                    ? "Pay at Shop"
                    : paymentType === "payFull"
                        ? "UPI selected · Payment not processed"
                        : "Card selected · Payment not processed"
                }
                fileName={fileName}
                pageCount={pageCount}
                printingCost={printingCost}
                deliveryFee={deliveryFee}
                wrapperFee={wrapperFee}
                onViewOrders={() => router.push("/orders")}
                onBackHome={() => router.push("/")}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
