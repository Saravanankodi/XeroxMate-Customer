
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

        {queuePosition > 0 && (
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
            Queue Position: #{queuePosition} in Line
          </span>
        )}
      </div>

      <div className="relative mt-8 flex flex-col gap-4 sm:grid sm:grid-cols-6 sm:gap-1">
        <div className="absolute left-[8%] right-[8%] top-3 hidden h-0.5 bg-slate-200 sm:block" />
        <div
          className="absolute left-[8%] top-3 hidden h-0.5 bg-blue-600 transition-all sm:block"
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
              className="relative z-10 flex min-w-0 items-center gap-3 text-left sm:flex-col sm:gap-0 sm:text-center"
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white ring-4 ring-blue-50"
                    : completed
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-500"
                }`}
              >
                {completed ? "✓" : index + 1}
              </div>

              <span className="text-xs font-semibold leading-4 text-slate-700">
                {stage}
              </span>

              <span className="ml-auto text-xs text-slate-400 sm:ml-0 sm:mt-1">
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
