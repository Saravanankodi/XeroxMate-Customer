
"use client";

import {
  Smartphone,
  CreditCard,
  Store,
  CheckCircle2,
} from "lucide-react";

export type PaymentType = "payFull" | "payAdvance" | "payAtShop" | "CashOnDelivery";

type PaymentMethodProps = {
  value: PaymentType;
  onChange: (value: PaymentType) => void;
};

const methods: {
  id: PaymentType;
  title: string;
  description: string;
  icon: typeof Smartphone;
}[] = [
  {
    id: "payFull",
    title: "Pay Full",
    description: "Instant UPI / QR",
    icon: Smartphone,
  },
  {
    id: "payAdvance",
    title: "Pay Advance (50%)",
    description: "Token commitment",
    icon: CreditCard,
  },
  {
    id: "payAtShop",
    title: "Pay at Shop",
    description: "Cash / Counter QR",
    icon: Store,
  },
  {
    id: "CashOnDelivery",
    title: "Delivery Pay",
    description: "Cash on delivery",
    icon: Store,
  },
];

export default function PaymentMethod({
  value,
  onChange,
}: PaymentMethodProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-base font-bold text-slate-900">
        Payment Method
      </h2>

      <p className="mt-1 text-xs text-slate-500">
        Choose how you would like to pay for your print order.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {methods.map((method) => {
          const Icon = method.icon;
          const selected = value === method.id;

          return (
            <button
              type="button"
              key={method.id}
              onClick={() => onChange(method.id)}
              aria-pressed={selected}
              className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-blue-600 bg-blue-50 ring-1 ring-blue-100"
                  : "border-slate-200 hover:border-blue-300"
              }`}
            >
              <span
                className={`rounded-lg p-3 ${
                  selected
                    ? "bg-blue-700 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                <Icon size={20} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-slate-800">
                  {method.title}
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  {method.description}
                </span>
              </span>

              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  selected
                    ? "border-blue-700 bg-blue-700 text-white"
                    : "border-slate-300"
                }`}
              >
                {selected && <CheckCircle2 size={15} />}
              </span>
            </button>
          );
        })}
      </div>

      {value === "payFull" && (
        <div className="mt-4 rounded-lg bg-blue-50 p-3 text-xs leading-5 text-blue-800">
          You will be able to complete your payment using a supported UPI
          provider when payment gateway integration is enabled.
        </div>
      )}

      {value === "payAdvance" && (
        <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-600">
          Card details should be collected through a secure payment
          gateway, not directly in this frontend.
        </div>
      )}

      {value === "CashOnDelivery" && (
        <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-xs leading-5 text-emerald-800">
          You can pay at the selected print shop when collecting your
          order, subject to the shop&apos;s payment policy.
        </div>
      )}
    </section>
  );
}
