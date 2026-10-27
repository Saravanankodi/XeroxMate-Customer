
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
  updatedAt = "13/10/2026 12:05 PM",
  queuePosition = 2,
}: SpoolerTimelineProps) {
  const activeIndex = Math.max(
    0,
    Math.min(currentStage, stages.length - 1)
  );

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-800">
            ◉ LIVE SPOOLER TIMELINE (6 STAGES)
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Real-time status updates from the print shop
          </p>
        </div>

        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
          Queue Position: #{queuePosition} in Line
        </span>
      </div>

      <div className="relative mt-8 grid grid-cols-6 gap-1">
        <div className="absolute left-[8%] right-[8%] top-3 h-0.5 bg-slate-200" />
        <div
          className="absolute left-[8%] top-3 h-0.5 bg-blue-600 transition-all"
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
              className="relative z-10 flex min-w-0 flex-col items-center text-center"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white ring-4 ring-blue-50"
                    : completed
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-500"
                }`}
              >
                {completed ? "✓" : index + 1}
              </div>

              <span className="mt-3 text-[10px] font-semibold leading-4 text-slate-700 sm:text-xs">
                {stage}
              </span>

              <span className="mt-1 text-[10px] text-slate-400">
                {active
                  ? updatedAt
                  : completed
                    ? "Done"
                    : "Pending"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
