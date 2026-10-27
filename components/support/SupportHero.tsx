
import { Headset } from "lucide-react";

export default function SupportHero() {
  return (
    <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div>
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-900">
          24/7 Support Desk
        </span>

        <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">
          Help &amp; Customer Support
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
          Have questions about your print job, pickup PIN, billing, or print
          quality? We are here to help students and faculty across campus hubs.
        </p>
      </div>

      <a
        href="tel:+919092579460"
        className="flex shrink-0 items-center gap-3 self-start rounded-xl border border-white bg-white px-4 py-3 shadow-sm transition hover:shadow-md sm:self-center"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-900">
          <Headset size={21} />
        </span>

        <span>
          <span className="block text-xs text-slate-600">
            Instant Emergency Helpline
          </span>
          <span className="mt-0.5 block text-sm font-bold text-blue-950">
            +91 9092579460
          </span>
        </span>
      </a>
    </section>
  );
}
