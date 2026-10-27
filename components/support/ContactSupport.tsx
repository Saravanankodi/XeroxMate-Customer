
import { ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";

export default function ContactSupport() {
  return (
    <section className="rounded-2xl border border-white bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-blue-900">
            <MessageCircle size={18} />
          </span>

          <h2 className="font-heading text-lg font-bold text-blue-950">
            Contact us directly
          </h2>
        </div>

        <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-bold text-teal-800">
          Active
        </span>
      </div>

      <div className="space-y-2">
        <a
          href="tel:+919092579460"
          className="group flex items-center gap-3 rounded-xl bg-indigo-50/80 p-3 transition hover:bg-indigo-100"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-800">
            <Phone size={18} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-xs text-slate-500">
              Phone Support
            </span>
            <span className="mt-0.5 block text-xs font-bold text-slate-800">
              +91 9092579460
            </span>
          </span>

          <ChevronRight size={15} className="text-slate-500 transition group-hover:translate-x-0.5" />
        </a>

        <a
          href="mailto:desflyer.tech@gmail.com"
          className="group flex items-center gap-3 rounded-xl bg-indigo-50/80 p-3 transition hover:bg-indigo-100"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-800">
            <Mail size={18} />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-xs text-slate-500">
              Official Help Desk
            </span>
            <span className="mt-0.5 block break-all text-xs font-bold text-slate-800">
              desflyer.tech@gmail.com
            </span>
          </span>

          <ChevronRight size={15} className="text-slate-500 transition group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
