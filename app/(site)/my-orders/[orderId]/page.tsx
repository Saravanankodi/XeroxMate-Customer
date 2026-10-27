"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";

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
import { sampleOrders } from "@/types/order";
import { useOrderDraft } from "@/lib/order-draft";
import { usePlacedOrders } from "@/lib/placed-orders";
import {
  markOrderCancelled,
  useCancelledOrderIds,
} from "@/lib/cancelled-orders";

const stageByStatus: Record<string, number> = {
  awaiting_acceptance: 0,
  processing: 2,
  ready_for_pickup: 4,
  completed: 5,
  cancelled: 0,
};

const labelByStatus: Record<string, string> = {
  awaiting_acceptance: "New Order · Awaiting Acceptance",
  processing: "Processing · Printing",
  ready_for_pickup: "Ready for Pickup",
  completed: "Completed",
  cancelled: "Cancelled",
};

function formatDate(value?: string) {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

function OrderDetailsContent() {
  const params = useParams<{ orderId: string }>();
  const { draft } = useOrderDraft();
  const placedOrders = usePlacedOrders();
  const cancelledIds = useCancelledOrderIds();
  const orderId = params.orderId;
  const sampleOrder =
    sampleOrders.find((order) => order.id === orderId) ??
    placedOrders.find((order) => order.id === orderId);

  const cancelled =
    sampleOrder?.status === "cancelled" || cancelledIds.includes(orderId);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const draftTotal =
    (draft.printingCost || 1.5) + draft.deliveryFee + draft.wrapperFee;
  const total = sampleOrder?.total ?? draftTotal;
  const sampleBalance = sampleOrder?.balanceDue ?? total;
  const [paymentComplete, setPaymentComplete] = useState(sampleBalance === 0);
  const balance = paymentComplete ? 0 : sampleBalance;
  const currentStage = cancelled
    ? 0
    : sampleOrder
      ? (stageByStatus[sampleOrder.status] ?? 0)
      : 0;
  const reviewUnlocked = currentStage >= 4 && !cancelled;

  const order: OrderDetails = {
    id: orderId,
    createdAt: formatDate(sampleOrder?.submittedAt),
    status: cancelled
      ? "Cancelled"
      : sampleOrder
        ? (labelByStatus[sampleOrder.status] ?? "New Order · Awaiting Acceptance")
        : "New Order · Awaiting Acceptance",
    paymentStatus: cancelled
      ? "Refunded"
      : paymentComplete
        ? "Paid"
        : (sampleOrder?.paymentMethod ?? "Unpaid"),
    balance,
    total,
    documentName:
      sampleOrder?.documentName ??
      (sampleOrder
        ? "Document.pdf"
        : (draft.fileName ?? "SaravananK(UIUX).pdf")),
    documentPages:
      sampleOrder?.documentPages ?? (sampleOrder ? 1 : draft.pageCount),
    documentSize:
      sampleOrder?.documentSize ??
      (sampleOrder
        ? "Unknown"
        : draft.fileSize
          ? `${(draft.fileSize / (1024 * 1024)).toFixed(2)} MB`
          : "0.2 MB (194 KB)"),
    pickupOtp: String(sampleOrder?.pickupPin ?? "8492"),
    shopName: sampleOrder?.shopName ?? draft.shopName ?? "Tamil Printers",
    shopAddress:
      sampleOrder?.shopAddress ??
      (sampleOrder
        ? "Address unavailable"
        : (draft.shopAddress ??
          "No. 4, Bismi Nagar, Baburajapuram, Kumbakonam, Tamil Nadu, 612302")),
    shopPhone: "9092579480",
    shopRating: sampleOrder?.rating ?? 5.0,
  };

  const settings = sampleOrder ? sampleOrder.settings : draft.settings;
  const fulfillment = sampleOrder
    ? (sampleOrder.fulfillment ?? "pickup")
    : draft.fulfillment;

  const specification: PrintSpecificationType = {
    paper: settings?.paper ?? "A4 Paper",
    printType: settings?.color ?? "Black & White",
    sides: settings?.sides ?? "Front Only",
    orientation: settings?.orientation ?? "Portrait",
    copies: settings?.quantity ?? 1,
    pages: settings?.pageRange ?? "All pages",
    pageLayout: settings?.layout ?? "1 Page / Sheet",
    binding: settings?.binding ?? "None",
    extras: settings?.finishing ?? "None",
    deliveryOption: fulfillment === "delivery" ? "Delivery" : "Pickup",
  };

  const queuePosition = currentStage < 5 ? (sampleOrder ? 2 : 1) : 0;

  function handleCancel() {
    markOrderCancelled(order.id);
  }

  function handlePay() {
    setPaymentComplete(true);
  }

  function handleCallOperator() {
    window.location.href = `tel:${order.shopPhone}`;
  }

  function handleReview() {
    setReviewSubmitted(true);
  }

  return (
    <div className="flex flex-1 flex-col bg-[#f8f8fd] text-slate-800">
      <main className="mx-auto w-full max-w-360 flex-1 space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <Link
              href="/my-orders"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-900"
            >
              <ArrowLeft size={15} />
              Back to My Orders
            </Link>

            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-[#00236F]">
              Order Details
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-5 text-[#444651]">
              Track spooling, printing progress and your counter pickup token
              in real time.
            </p>
          </div>

          <Link
            href="/order"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0072E4] px-4 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
          >
            <Plus size={15} />
            New Print Order
          </Link>
        </section>

        <OrderStatusCard
          orderId={order.id}
          createdAt={order.createdAt}
          status={order.status}
          paymentStatus={order.paymentStatus}
          balance={order.balance}
          onCancel={handleCancel}
        />

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
          <div className="min-w-0 space-y-4 lg:col-span-8">
            <SpoolerTimeline
              currentStage={currentStage}
              updatedAt={formatDate(sampleOrder?.submittedAt)}
              queuePosition={queuePosition}
            />

            <DocumentInspection
              fileName={order.documentName}
              pages={order.documentPages}
              fileSize={order.documentSize}
            />

            <PrintSpecification specification={specification} />
          </div>

          <aside className="min-w-0 space-y-4 lg:col-span-4">
            <PickupTokenCard
              otp={order.pickupOtp}
              orderId={order.id}
              active={currentStage >= 4 && currentStage < 5 && !cancelled}
            />

            <PaymentBreakdown
              documentCost={
                sampleOrder?.documentCost ??
                (sampleOrder ? order.total : (draft.printingCost || 1.5))
              }
              preflightCost={0}
              convenienceFee={0}
              deliveryFee={
                sampleOrder?.deliveryFee ?? (sampleOrder ? 0 : draft.deliveryFee)
              }
              wrapperFee={
                sampleOrder?.wrapperFee ?? (sampleOrder ? 0 : draft.wrapperFee)
              }
              total={order.total}
              amountDue={order.balance}
              paymentStatus={order.paymentStatus}
              onPay={handlePay}
            />

            <ReviewPanel
              unlocked={reviewUnlocked}
              onSubmit={handleReview}
            />

            {reviewSubmitted && (
              <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
                Thanks! Your review has been recorded.
              </p>
            )}

            <AssignedPrintShop
              name={order.shopName}
              address={order.shopAddress}
              phone={order.shopPhone}
              rating={order.shopRating}
              open={!cancelled}
              hours="Monday – Sunday · 09:00 – 23:00"
              onCallOperator={handleCallOperator}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default function OrderDetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-[60vh] bg-[#f8f8fd] p-6">
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
