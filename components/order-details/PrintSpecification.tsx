
import type { PrintSpecification as PrintSpecificationType } from "../../types/order-details.ts";

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
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="font-bold text-slate-800">
            Print Specification
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Standard B&amp;W Configuration
          </p>
        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs text-indigo-700">
          ✓ Verified Settings
        </span>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-slate-100">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`flex items-center justify-between gap-4 px-3 py-2.5 text-sm ${
              index % 2 === 0 ? "bg-indigo-50/70" : "bg-white"
            }`}
          >
            <span className="text-slate-600">{row.label}</span>
            <span className="text-right font-semibold text-slate-800">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
