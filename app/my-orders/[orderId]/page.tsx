
"use client";

import { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";

import OrderStatusCard from "@/components/order-details/OrderStatusCard";
import SpoolerTimeline from "@/components/order-details/SpoolerTimeline";
import DocumentInspection from "@/components/order-details/DocumentInspection";
import PrintSpecification from "@/components/order-details/PrintSpecification";
import PickupTokenCard from "@/components/order-details/PickupTokenCard";
import PaymentBreakdown from "@/components/order-details/PaymentBreakdown";
import ReviewPanel from "@/components/order-details/ReviewPanel";
import AssignedPrintShop from "@/components/order-details/AssignedPrintShop";

import type {
  OrderDetails,
  PrintSpecification as PrintSpecificationType,
} from "@/types/order-details";
import PageHeading from "@/components/my-orders/PageHeading";

function OrderDetailsContent() {
  const params = useParams<{ orderId: string }>();
  const router = useRouter();
  const orderId = params.orderId;

  // Replace mock data with your backend API response.
  const order: OrderDetails = {
    id: orderId,
    createdAt: "13/10/2026, 12:05:38 pm",
    status: "New Order · Awaiting Acceptance",
    paymentStatus: "Unpaid",
    balance: 1.5,
    total: 1.5,
    documentName: "SaravananK(UIUX).pdf",
    documentPages: 2,
    documentSize: "0.2 MB (194 KB)",
    pickupOtp: "8492",
    shopName: "Tamil Printers",
    shopAddress:
      "No. 4, Bismi Nagar, Baburajapuram, Kumbakonam, Tamil Nadu, 612302",
    shopPhone: "9092579480",
    shopRating: 5.0,
  };

  const specification: PrintSpecificationType = {
    paper: "A4 Paper",
    printType: "Black & White",
    sides: "Front Only",
    orientation: "Portrait",
    copies: 1,
    pages: "All pages (1 Total Page)",
    pageLayout: "1 Page / Sheet",
    binding: "None",
    extras: "None",
    deliveryOption: "Pickup",
  };

  const currentStage = 0;
  const queuePosition = 2;
  const reviewUnlocked = currentStage >= 4;

  function handleCancel() {
    // Connect your order cancellation API here.
    console.log("Cancel order:", order.id);
  }

  function handlePay() {
    router.push(
      `/order/payment?orderId=${encodeURIComponent(order.id)}`
    );
  }

  function handleCallOperator() {
    window.location.href = `tel:${order.shopPhone}`;
  }

  function handleReview(review: {
    rating: number;
    feedback: string;
  }) {
    // Connect your review submission API here.
    console.log("Review submitted:", review, order.id);
  }

  return (
    <main className="min-h-screen bg-[#f8f8fd] text-slate-800">
      <div className="mx-auto max-w-360 px-4 py-6 space-y-5 sm:px-6 lg:px-8">
        {/* Page heading */}
        <PageHeading/>

        {/* Order status */}
        <div className="mb-5">
          <OrderStatusCard
            orderId={order.id}
            createdAt={order.createdAt}
            status={order.status}
            paymentStatus={order.paymentStatus}
            balance={order.balance}
            onCancel={handleCancel}
          />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          {/* Left column */}
          <div className="space-y-4 lg:col-span-8">
            <SpoolerTimeline
              currentStage={currentStage}
              updatedAt="13/10 12:05 PM"
              queuePosition={queuePosition}
            />

            <DocumentInspection
              fileName={order.documentName}
              pages={order.documentPages}
              fileSize={order.documentSize}
            />

            <PrintSpecification specification={specification} />
          </div>

          {/* Right column */}
          <aside className="space-y-4 lg:col-span-4">
            <PickupTokenCard
              otp={order.pickupOtp}
              orderId={order.id}
              active={currentStage >= 4 && currentStage < 5}
            />

            <PaymentBreakdown
              documentCost={1.5}
              preflightCost={0}
              convenienceFee={0}
              total={order.total}
              paymentStatus={order.paymentStatus}
              onPay={handlePay}
            />

            <ReviewPanel
              unlocked={reviewUnlocked}
              onSubmit={handleReview}
            />

            <AssignedPrintShop
              name={order.shopName}
              address={order.shopAddress}
              phone={order.shopPhone}
              rating={order.shopRating}
              open={true}
              hours="Sunday · 09:00 – 23:00"
              onCallOperator={handleCallOperator}
            />
          </aside>
        </div>
      </div>
    </main>
  );
}

export default function OrderDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f8f8fd] p-6">
          <div className="mx-auto max-w-7xl animate-pulse">
            <div className="h-8 w-48 rounded bg-slate-200" />
            <div className="mt-6 h-32 rounded-xl bg-white" />
            <div className="mt-5 h-64 rounded-xl bg-white" />
          </div>
        </main>
      }
    >
      <OrderDetailsContent />
    </Suspense>
  );
}
