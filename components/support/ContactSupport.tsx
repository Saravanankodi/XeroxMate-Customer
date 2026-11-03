
import { ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";

export default function ContactSupport() {
  return (
    <section className="sm:rounded-2xl rounded-lg border border-white bg-white p-3 shadow-sm sm:p-5">
      <div className="mb-2 sm:mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="hidden sm:flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-blue-900">
            <MessageCircle size={18} />
          </span>

          <h2 className="font-heading text-base sm:text-lg font-bold text-blue-950">
            Contact us directly
          </h2>
        </div>

        <span className="rounded-full bg-teal-100 px-1 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-xs font-bold text-teal-800">
          Active
        </span>
      </div>

      <div className="space-y-2">
        <a
          href="tel:+919092579460"
          className="group flex items-center gap-3 rounded-xl bg-indigo-50/80 p-3 transition hover:bg-indigo-100"
        >
          <span className="flex sm:h-10 sm:w-10 h-6 w-6 shrink-0 items-center justify-center rounded-sm sm:rounded-lg bg-white text-blue-800">
            <Phone className="w-4 h-4 sm:h-5 sm:w-5" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-[10px] sm:text-xs font-semibold text-slate-500">
              Phone Support
            </span>
            <span className="mt-0.5 block text-sm sm:text-base font-bold text-slate-800">
              +91 9092579460
            </span>
          </span>

          <ChevronRight size={15} className="text-slate-500 transition group-hover:translate-x-0.5" />
        </a>

        <a
          href="mailto:desflyer.tech@gmail.com"
          className="group flex items-center gap-3 rounded-xl bg-indigo-50/80 p-3 transition hover:bg-indigo-100"
        >
          <span className="flex sm:h-10 sm:w-10 h-6 w-6 shrink-0 items-center justify-center rounded-sm sm:rounded-lg bg-white text-blue-800">
            <Mail  className="w-4 h-4 sm:h-5 sm:w-5" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-[10px] sm:text-xs font-semibold text-slate-500">
              Official Help Desk
            </span>
            <span className="mt-0.5 block break-all text-xs sm:text-sm font-bold text-slate-800">
              desflyer.tech@gmail.com
            </span>
          </span>

          <ChevronRight size={15} className="text-slate-500 transition group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}
