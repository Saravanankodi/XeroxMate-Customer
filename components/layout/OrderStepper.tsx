
"use client";

import { Check, MoveRight } from "lucide-react";

const steps = [
  "Upload",
  "Specifications",
  "Select Store",
  "Payment",
];

type OrderStepperProps = {
  currentStep: number;
};

export default function OrderStepper({
  currentStep,
}: OrderStepperProps) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto sm:gap-2">
      {steps.map((step, index) => {
        const number = index + 1;
        const completed = number < currentStep;
        const active = number === currentStep;

        return (
          <div
            key={step}
            className="flex shrink-0 items-center gap-1 sm:gap-2"
          >
            <div
              aria-current={active ? "step" : undefined}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold leading-4 ${
                completed
                  ? "border border-[rgba(186,230,253,0.8)] bg-[rgba(167,243,208,0.6)] text-[#059669] shadow-[0_0_0_2px_#E0F2FE]"
                  : active
                    ? "bg-[#F0F9FF] text-[#0369A1]"
                    : "text-[#94A3B8]"
              }`}
            >
              {completed && <Check size={12} strokeWidth={3} />}
              {!completed && `${number}.`}
              {step}
            </div>

            {index < steps.length - 1 && (
              <span className="text-[#CBD5E1]">
                <MoveRight className="size-4" />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
