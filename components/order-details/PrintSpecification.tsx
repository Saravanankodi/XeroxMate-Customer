
import { Printer, ShieldCheck } from "lucide-react";

import type { PrintSpecification as PrintSpecificationType } from "@/types/order-details";

interface Props {
  specification: PrintSpecificationType;
}

export default function PrintSpecification({ specification }: Props) {
  const rows: { label: string; value: string | number }[] = [
    { label: "Paper", value: specification.paper },
    { label: "Print type", value: specification.printType },
    { label: "Sides", value: specification.sides },
    { label: "Orientation", value: specification.orientation },
    { label: "Copies", value: specification.copies },
    { label: "Pages", value: specification.pages },
    { label: "Page layout", value: specification.pageLayout },
    { label: "Binding", value: specification.binding },
    { label: "Extras", value: specification.extras },
    { label: "Delivery option", value: specification.deliveryOption },
  ];

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-2 px-0.5 pb-1">
        <div className="flex items-center gap-1">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#D7E3FF] text-[#00236F]">
            <Printer size={13.5} />
          </span>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-heading text-lg leading-[22px] font-bold text-[#131B2E]">
                Print Specification
              </h3>
              <span className="rounded-full bg-[#E2E7FF] px-2 py-0.5 text-xs leading-[14px] font-semibold text-[#00236F]">
                Document 1
              </span>
            </div>
            <p className="text-xs leading-5 text-[#444651]">
              Standard B&amp;W Configuration
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1 rounded-full bg-[#EAEDFF] px-2.5 py-1 text-xs leading-[14px] font-medium text-[#444651]">
          <ShieldCheck size={12.5} className="shrink-0 text-[#005AB6]" />
          Verified Settings
        </span>
      </div>

      <div className="divide-y divide-[#DAE2FD] overflow-hidden rounded-xl bg-[#F2F3FF]">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 px-4 py-2.5"
          >
            <span className="shrink-0 text-sm leading-5 font-medium text-[#444651]">
              {row.label}
            </span>
            <span className="min-w-0 wrap-break-words text-right text-xs leading-4 font-bold text-[#131B2E]">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
