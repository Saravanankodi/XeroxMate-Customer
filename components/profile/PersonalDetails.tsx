
"use client";

import { useState } from "react";
import { CheckCircle2, UserRound } from "lucide-react";

export default function PersonalDetails() {
  const [form, setForm] = useState({
    name: "THESTART",
    phone: "90925 79460",
    email: "thestart.eng@gmail.com",
    alternatePhone: "94431 82910",
  });

  const [message, setMessage] = useState("");

  function update(
    field: keyof typeof form,
    value: string
  ) {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  function saveDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Connect to your profile API to persist changes.
    setMessage("Details validated. Connect your profile API to save changes.");
  }

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-800">
          <UserRound size={19} />
        </span>
        <div>
          <h2 className="font-heading text-base font-bold text-slate-900">
            Personal Details
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Used for print pickup OTPs and delivery notifications.
          </p>
        </div>
      </div>

      <form onSubmit={saveDetails} className="mt-4 space-y-3">
        <div>
          <label htmlFor="profile-name" className="text-xs font-bold uppercase tracking-wide text-slate-600">
            Full Name
          </label>
          <input
            id="profile-name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="profile-phone" className="text-xs font-bold uppercase tracking-wide text-slate-600">
            Phone Number
          </label>
          <div className="mt-1.5 flex overflow-hidden rounded-xl border border-slate-200 focus-within:border-blue-500">
            <span className="flex items-center border-r border-slate-200 bg-slate-50 px-2 text-xs text-slate-600">
              🇮🇳 +91
            </span>
            <input
              id="profile-phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="min-w-0 flex-1 px-3 py-2.5 text-xs outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-slate-400">
            WhatsApp and SMS alerts will be sent here.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="profile-email" className="text-xs font-bold uppercase tracking-wide text-slate-600">
              Email Address
            </label>
            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
              <CheckCircle2 size={11} /> Verified
            </span>
          </div>
          <input
            id="profile-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="profile-alt-phone" className="text-xs font-bold uppercase tracking-wide text-slate-600">
            Alternate Phone Number{" "}
            <span className="font-normal normal-case text-slate-400">
              (optional backup)
            </span>
          </label>
          <div className="mt-1.5 flex overflow-hidden rounded-xl border border-slate-200 focus-within:border-blue-500">
            <span className="flex items-center border-r border-slate-200 bg-slate-50 px-2 text-xs text-slate-600">
              🇮🇳 +91
            </span>
            <input
              id="profile-alt-phone"
              type="tel"
              value={form.alternatePhone}
              onChange={(e) => update("alternatePhone", e.target.value)}
              className="min-w-0 flex-1 px-3 py-2.5 text-xs outline-none"
            />
          </div>
        </div>

        {message && (
          <p role="status" className="rounded-lg bg-blue-50 p-2.5 text-xs text-blue-800">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-800"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}
