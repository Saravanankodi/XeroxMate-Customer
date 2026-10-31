
import { Activity } from "lucide-react";

const stages = [
  "New",
  "Accepted",
  "Printing",
  "Finishing",
  "Ready for Pickup",
  "Completed",
];

interface SpoolerTimelineProps {
  currentStage: number;
  updatedAt?: string;
  queuePosition?: number;
}

export default function SpoolerTimeline({
  currentStage,
  updatedAt = "Just now",
  queuePosition = 2,
}: SpoolerTimelineProps) {
  const activeIndex = Math.max(
    0,
    Math.min(currentStage, stages.length - 1)
  );

  return (
    <section className="flex flex-col gap-6 rounded-xl border border-[#E2E7F4] bg-white p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <Activity size={16} className="shrink-0 text-[#2563EB]" />
            <h3 className="font-heading text-lg leading-5 font-bold tracking-[0.7px] text-[#0F172A] uppercase">
              Live Spooler Timeline (6 Stages)
            </h3>
          </div>
          <p className="text-xs leading-4 text-[#64748B]">
            Real-time status updates from the print shop counter
          </p>
        </div>

        {queuePosition > 0 && (
          <span className="rounded border border-[#E2E8F0] bg-[#F1F5F9] px-2.5 py-1 text-xs leading-4 font-medium text-[#64748B]">
            Queue Position: #{queuePosition} in Line
          </span>
        )}
      </div>

      <div className="relative flex flex-col gap-4 sm:grid sm:grid-cols-6 sm:gap-4 sm:pt-1">
        <div className="absolute left-[8%] right-[8%] top-[21px] hidden h-[3px] bg-[#E2E8F0] sm:block" />
        <div
          className="absolute left-[8%] top-[21px] hidden h-[3px] bg-[#2563EB] transition-all sm:block"
          style={{
            width: `${(activeIndex / (stages.length - 1)) * 84}%`,
          }}
        />

        {stages.map((stage, index) => {
          const completed = index < activeIndex;
          const active = index === activeIndex;

          return (
            <div
              key={stage}
              className="relative z-10 flex min-w-0 items-start gap-3 text-left sm:flex-col sm:items-center sm:gap-0 sm:text-center"
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-full font-footer text-sm font-bold ${
                  active
                    ? "bg-[#2563EB] text-white shadow-[0_0_0_4px_#DBEAFE,0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
                    : completed
                      ? "bg-[#2563EB] text-white"
                      : "border-2 border-[#CBD5E1] bg-white text-[#94A3B8]"
                }`}
              >
                {completed ? "✓" : index + 1}
              </div>

              <div className="flex min-w-0 flex-col pt-2 sm:items-center">
                <span
                  className={`font-heading text-sm leading-4 ${
                    active
                      ? "font-bold text-[#0F172A]"
                      : "font-semibold text-[#475569]"
                  }`}
                >
                  {stage}
                </span>

                <span
                  className={`text-xs leading-4 ${
                    active
                      ? "font-semibold text-[#2563EB]"
                      : completed
                        ? "font-medium text-[#2563EB]"
                        : "font-normal text-[#94A3B8]"
                  }`}
                >
                  {active ? updatedAt : completed ? "Done" : "Pending"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
