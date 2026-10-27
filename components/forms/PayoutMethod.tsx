
"use client";

import { useState } from "react";
import { Check, CreditCard, Wallet } from "lucide-react";

export default function PayoutMethod() {
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("thestart@okaxis");
  const [message, setMessage] = useState("");

  function saveMethod() {
    if (method === "upi" && !/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) {
      setMessage("Enter a valid UPI ID, such as name@bank.");
      return;
    }

    // Connect to the payout API before saving in production.
    setMessage("Payout method validated. Connect your payout API to save it.");
  }

  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
          <Wallet size={19} />
        </span>
        <div>
          <h2 className="font-heading text-base font-bold text-slate-900">
            Payout &amp; Refund Method
          </h2>
          <p className="mt-0.5 text-xs text-slate-500">
            Destination for failed page refunds and campus balance returns.
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        <div
          onClick={() => {
            setMethod("upi");
            setMessage("");
          }}
          className={`block cursor-pointer rounded-xl border p-3 transition ${
            method === "upi"
              ? "border-blue-900 bg-blue-50/40 ring-1 ring-blue-900"
              : "border-slate-200 hover:border-blue-200"
          }`}
        >
          <div className="flex items-start gap-2.5">
            <input
              type="radio"
              name="payout-method"
              checked={method === "upi"}
              onChange={() => {
                setMethod("upi");
                setMessage("");
              }}
              className="mt-1 accent-blue-900"
            />

            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-800">
                Instant UPI Transfer
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-bold text-blue-900">
                  DEFAULT
                </span>
              </span>
              <span className="mt-1 block text-xs text-slate-500">
                Google Pay, PhonePe, Paytm, BHIM
              </span>
            </span>

            <Wallet size={16} className="text-blue-600" />
          </div>

          {method === "upi" && (
            <div className="mt-3 border-t border-slate-200 pt-3">
              <label htmlFor="payout-upi" className="text-xs font-bold uppercase text-slate-600">
                Registered VPA / UPI ID
              </label>

              <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-2.5">
                <input
                  id="payout-upi"
                  value={upiId}
                  onChange={(e) => {
                    setUpiId(e.target.value);
                    setMessage("");
                  }}
                  className="min-w-0 flex-1 py-3 text-sm outline-none"
                  placeholder="name@bank"
                />
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <Check size={11} /> UPI
                </span>
              </div>
            </div>
          )}
        </div>

        <label className={`flex cursor-pointer items-center gap-2.5 rounded-xl border p-3 transition ${
          method === "wallet"
            ? "border-blue-900 bg-blue-50/40"
            : "border-slate-200 hover:border-blue-200"
        }`}>
          <input
            type="radio"
            name="payout-method"
            checked={method === "wallet"}
            onChange={() => {
              setMethod("wallet");
              setMessage("");
            }}
            className="accent-blue-900"
          />
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-800">
              Campus Wallet
              <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[11px] font-bold text-emerald-800">
                +5% Bonus
              </span>
            </span>
            <span className="mt-1 block text-xs text-slate-500">
              Refunds credited to your XeroxMate balance
            </span>
          </span>
          <CreditCard size={15} className="text-slate-400" />
        </label>

        {message && (
          <p role="status" className="rounded-lg bg-blue-50 p-2.5 text-xs text-blue-800">
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={saveMethod}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
        >
          <Check size={13} className="text-blue-700" />
          Save Payout Method
        </button>
      </div>
    </section>
  );
}
