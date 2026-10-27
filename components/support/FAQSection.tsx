
"use client";

import { useState } from "react";
import {
  Banknote,
  ChevronDown,
  Clock3,
  FileCheck,
  LockKeyhole,
  Store,
  RefreshCcw,
} from "lucide-react";

const faqs = [
  {
    question: "How long does printing take?",
    answer:
      "Standard black & white orders under 50 pages are ready within 8 to 15 minutes of shop acceptance. Bulk project or spiral bindings take 1 to 2 hours. You receive an instant SMS when the job finishes.",
    icon: Clock3,
  },
  {
    question: "Are my documents safe?",
    answer:
      "Your documents are handled securely and are scheduled for deletion after collection. Only authorized processing systems should have access to your files.",
    icon: LockKeyhole,
  },
  {
    question: "Can I pay after collecting?",
    answer:
      "Available payment options depend on the selected shop and order. Check your order's payment instructions before visiting the counter.",
    icon: Banknote,
  },
  {
    question: "What if the print quality is wrong?",
    answer:
      "Raise a support ticket with your order ID and attach a photo of the defect. Our support team can review eligible reprints or wallet credits.",
    icon: RefreshCcw,
  },
  {
    question: "What if the shop is closed on arrival?",
    answer:
      "Submit a shop-related support ticket with your order ID and arrival details. Our team can help you check the next available collection option.",
    icon: Store,
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="rounded-2xl border border-white bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-blue-900">
            <FileCheck size={18} />
          </span>
          <h2 className="font-serif text-lg font-bold text-blue-950">
            Frequently asked
          </h2>
        </div>

        <span className="text-[10px] font-medium text-slate-500">
          {faqs.length} answers
        </span>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, index) => {
          const Icon = faq.icon;
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;

          return (
            <div key={faq.question} className="overflow-hidden rounded-xl bg-indigo-50/80">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center gap-2.5 px-3 py-3 text-left"
              >
                <Icon size={15} className="shrink-0 text-blue-700" />

                <span className="flex-1 text-xs font-bold text-slate-800">
                  {faq.question}
                </span>

                <ChevronDown
                  size={15}
                  className={`shrink-0 text-slate-500 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={answerId}
                  className="px-3 pb-4 pl-9 text-xs leading-[1.65] text-slate-600"
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
