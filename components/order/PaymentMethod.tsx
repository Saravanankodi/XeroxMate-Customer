"use client";

import {
  Smartphone,
  CreditCard,
  Store,
  Check,
  Wallet,
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
    id: "CashOnDelivery",
    title: "Delivery Pay",
    description: "Cash on Delivery",
    icon: Store,
  },
  {
    id: "payAtShop",
    title: "Pickup Pay",
    description: "Cash / Counter QR",
    icon: Store,
  },
];

export default function PaymentMethod({
  value,
  onChange,
}: PaymentMethodProps) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-2">
        <Wallet size={20} strokeWidth={2} className="shrink-0 text-[#005AB6]" />
        <h2 className="font-heading text-2xl font-semibold leading-5.5 text-[#131B2E]">
          Select Payment Method
        </h2>
      </div>

      <p className="mt-1 text-sm leading-4 text-[#444651]">
        Choose how you would like to pay for your print order.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {methods.map((method) => {
          const Icon = method.icon;
          const selected = value === method.id;

          return (
            <button
              type="button"
              key={method.id}
              onClick={() => onChange(method.id)}
              aria-pressed={selected}
              className={`flex w-full items-center gap-3 rounded-xl p-4 text-left shadow-sm transition ${
                selected
                  ? "bg-[#F2F3FF]"
                  : "bg-white hover:bg-[#FAF8FF]"
              }`}
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full transition ${
                  selected
                    ? "bg-[#0072E4] text-white"
                    : "bg-[#EAEDFF] text-[#131B2E]"
                }`}
              >
                <Icon size={16} strokeWidth={2} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block font-heading text-base font-semibold leading-5 text-[#131B2E]">
                  {method.title}
                </span>

                <span className="mt-1 block text-sm leading-4 text-[#444651]">
                  {method.description}
                </span>
              </span>

              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full transition ${
                  selected
                    ? "bg-[#005AB6] text-white"
                    : "border border-[#E2E7FF]"
                }`}
              >
                {selected && <Check size={12} strokeWidth={3} />}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
