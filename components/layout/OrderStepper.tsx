
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
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-[9px] sm:px-3 sm:text-sm font-bold ${
                completed
                  ? "bg-emerald-100 text-emerald-700"
                  : active
                    ? "border border-sky-200 bg-sky-50 font-semibold text-sky-700"
                    : "text-slate-400"
              }`}
            >
              {completed && <Check size={11} />}
              {!completed && `${number}.`}
              {step}
            </div>

            {index < steps.length - 1 && (
              <span className="text-slate-300">
                <MoveRight className="w-6 h-6"/>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
