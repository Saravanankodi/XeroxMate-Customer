
import { BadgeCheck, FileClock, Zap } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "12-Min First Response SLA",
    description:
      "Active priority ticketing queue for urgent submissions",
  },
  {
    icon: BadgeCheck,
    title: "100% Free Reprint Guarantee",
    description:
      "Immediate on-counter reprint or wallet credit for defects",
  },
  {
    icon: FileClock,
    title: "Zero-Leak Document Purge",
    description:
      "Files automatically erased 30 min post-collection",
  },
];

export default function SupportBenefits() {
  return (
    <section className="grid gap-5 rounded-2xl bg-linear-to-r from-blue-900 via-blue-700 to-blue-950 p-5 text-white shadow-sm md:grid-cols-3 md:p-6">
      {benefits.map(({ icon: Icon, title, description }) => (
        <div key={title} className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-200 ring-1 ring-white/10">
            <Icon size={21} />
          </div>

          <div>
            <h2 className="text-sm font-bold">{title}</h2>
            <p className="mt-1 text-xs leading-4 text-blue-100/80">
              {description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
