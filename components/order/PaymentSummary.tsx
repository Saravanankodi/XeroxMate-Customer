import { FileText, Store, Tag } from "lucide-react";

type PaymentSummaryProps = {
  shopName: string;
  shopAddress?: string;
  fileName: string;
  pageCount: number;
  printingCost: number;
  deliveryFee: number;
  wrapperFee: number;

  copyCount?: number;
  printMode?: string;
  fulfillmentMode?: string;
  deliveryAddress?: string;
  paymentScheme?: string;
  operatorInstructions?: string;
  subsidy?: number;
  platformFee?: number;
};

const formatINR = (amount: number) =>
  `₹${amount.toFixed(2)}`;

export default function PaymentSummary({
  shopName,
  fileName,
  pageCount,
  printingCost,
  deliveryFee,
  wrapperFee,
  copyCount = 1,
  printMode = "B/W Duplex",
  fulfillmentMode = "Pickup At Shop",
  deliveryAddress = "—",
  paymentScheme = "Paid Full (Instant UPI)",
  operatorInstructions = "—",
  subsidy = 0.04,
  platformFee = 0,
}: PaymentSummaryProps) {
  const baseCharge = printingCost;
  const subtotal =
    baseCharge + deliveryFee + wrapperFee + platformFee;
  const total = Math.max(0, subtotal - subsidy);

  const details = [
    { label: "Shop Node", value: shopName },
    {
      label: "Documents",
      value: `1 File(S) · ${pageCount} Pages`,
    },
    {
      label: "Fulfillment Mode",
      value: fulfillmentMode,
    },
    {
      label: "Delivery Address",
      value: deliveryAddress,
    },
    {
      label: "Payment Scheme",
      value: paymentScheme,
    },
    {
      label: "Operator Instructions",
      value: operatorInstructions,
    },
  ];

  return (
    <section className="flex w-full flex-col gap-6 rounded-xl bg-white p-6 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-heading text-lg font-semibold leading-5.5 text-[#131B2E]">
            Review Your Order
          </h2>
          <p className="mt-1 text-sm leading-4 text-[#444651]">
            Verify file parameters before sending to printer spooler
          </p>
        </div>

        <span className="w-fit shrink-0 rounded-full bg-[#D7E3FF] px-2 py-0.5 text-xs font-medium leading-3.5 text-[#001B3F]">
          Ready to Print
        </span>
      </div>

      {/* File-by-file quote */}
      <div className="rounded-xl bg-[#F2F3FF] p-4 shadow-sm">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium uppercase leading-3.5 tracking-[0.55px] text-[#444651]">
            File-by-file quote
          </span>
          <span className="text-xs leading-3.5 text-[#444651]">
            Before Delivery
          </span>
        </div>

        <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:flex-row sm:items-start">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1E3A8A] text-[#90A8FF]">
            <FileText size={18} strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="break-all font-heading text-sm font-semibold leading-5 text-[#131B2E]">
              {fileName}
            </p>
            <p className="mt-1 text-xs leading-4 text-[#444651]">
              {pageCount} printed pages · {copyCount}{" "}
              {copyCount === 1 ? "copy" : "copies"} · {printMode}
            </p>
          </div>

          <p className="shrink-0 font-body text-lg font-bold leading-5.5 text-[#00236F]">
            {formatINR(printingCost)}
          </p>
        </div>
      </div>

      {/* Specs breakdown */}
      <div className="rounded-xl bg-[#F2F3FF] p-4">
        {details.map((item) => {
          const isStrong =
            item.label === "Shop Node" ||
            item.label === "Fulfillment Mode";

          return (
            <div
              key={item.label}
              className="flex items-center justify-between gap-4 py-1 text-xs leading-4"
            >
              <span className="text-[#444651]">
                {item.label}
              </span>

              <span
                className={`max-w-[60%] wrap-break-words text-right ${
                  item.label === "Fulfillment Mode"
                    ? "font-semibold text-[#005AB6]"
                    : isStrong
                      ? "font-semibold text-[#131B2E]"
                      : "font-medium text-[#131B2E]"
                }`}
              >
                {item.label === "Fulfillment Mode" && (
                  <Store
                    size={13}
                    className="mr-1 inline-block align-text-bottom"
                  />
                )}
                {item.value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Itemized charges */}
      <div className="flex flex-col gap-1 text-xs leading-4">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[#444651]">
            Document Base Print Charges
          </span>
          <span className="shrink-0 font-medium text-[#131B2E]">
            {formatINR(baseCharge)}
          </span>
        </div>

        {subsidy > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1 text-[#00312C]">
              <Tag
                size={13}
                className="inline-block align-text-bottom"
              />
              Campus Student Subsidy
            </span>
            <span className="shrink-0 font-bold text-[#00312C]">
              -{formatINR(subsidy)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <span className="text-[#444651]">
            {fulfillmentMode === "Pickup At Shop"
              ? "Campus Pickup Fee"
              : "Delivery Fee"}
          </span>
          <span className="shrink-0 text-[11px] font-bold uppercase text-[#00312C]">
            {deliveryFee === 0
              ? "FREE"
              : formatINR(deliveryFee)}
          </span>
        </div>

        {wrapperFee > 0 && (
          <div className="flex items-center justify-between gap-4">
            <span className="text-[#444651]">
              Protective Wrapper
            </span>
            <span className="shrink-0 font-medium text-[#131B2E]">
              {formatINR(wrapperFee)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          <span className="text-[#444651]">
            Platform Fee &amp; Integrated GST
          </span>
          <span className="shrink-0 text-[#444651]">
            {formatINR(platformFee)}
          </span>
        </div>
      </div>

      {/* Total */}
      <div className="flex min-h-20.5 flex-col justify-between gap-4 rounded-xl bg-[#E2E7FF] p-4 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-heading text-lg font-bold leading-5.5 text-[#131B2E]">
            Total Amount
          </h3>
          <p className="mt-1 text-sm leading-4 text-[#444651]">
            Paid in full securely
          </p>
        </div>

        <div className="sm:text-right">
          <p className="font-body text-4xl font-bold leading-11 tracking-[-0.9px] text-[#00236F]">
            {formatINR(total)}
          </p>
          <p className="mt-1 text-xs font-semibold leading-3.5 text-[#757682]">
            Incl. all taxes
          </p>
        </div>
      </div>
    </section>
  );
}
