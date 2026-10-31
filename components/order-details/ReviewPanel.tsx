
"use client";

import { Info, Lock, Star } from "lucide-react";
import { useState } from "react";

interface ReviewPanelProps {
  unlocked: boolean;
  onSubmit?: (review: { rating: number; feedback: string }) => void;
}

export default function ReviewPanel({
  unlocked,
  onSubmit,
}: ReviewPanelProps) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  function submitReview() {
    if (!rating) return;

    onSubmit?.({ rating, feedback });
  }

  return (
    <section className="flex flex-col gap-4 rounded-xl border border-[#E2E7F4] bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-2 border-b border-[#F1F5F9] pb-3">
        <h3 className="font-heading text-lg leading-5 font-bold tracking-[0.7px] text-[#0F172A] uppercase">
          Review Tamil Printers
        </h3>

        <span className="inline-flex items-center gap-1 rounded bg-[#F1F5F9] px-2 py-0.5 text-xs leading-3.75 font-semibold text-[#64748B]">
          <Lock size={12} />
          {unlocked ? "Open" : "Locked"}
        </span>
      </div>

      {!unlocked && (
        <div className="flex items-start gap-2 rounded-lg border border-[#E2E8F0]/70 bg-[#F8FAFC] p-3 text-sm leading-4 text-[#475569]">
          <Info size={16} className="mt-0.5 shrink-0 text-[#94A3B8]" />
          <p>
            Reviews open automatically once Tamil Printers marks this order
            as Ready for Pickup.
          </p>
        </div>
      )}

      <fieldset
        disabled={!unlocked}
        className="flex flex-col gap-3 disabled:opacity-50"
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm leading-4 text-[#64748B]">
            How was your experience?
          </span>

          <div className="flex items-center" aria-label="Rate your experience">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                aria-label={`${star} star${star > 1 ? "s" : ""}`}
                aria-pressed={rating === star}
                className="p-0.5"
              >
                <Star
                  size={24}
                  className={
                    star <= rating
                      ? "fill-[#F59E0B] text-[#F59E0B]"
                      : "fill-[#CBD5E1] text-[#CBD5E1]"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="shop-review"
            className="text-sm leading-4 text-[#64748B]"
          >
            Tell us about your experience (optional)
          </label>

          <textarea
            id="shop-review"
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
            placeholder="Share your feedback..."
            rows={2}
            maxLength={1000}
            className="h-12.5 w-full resize-y rounded-lg border border-[#E2E8F0] bg-[#F1F5F9]/60 px-3 py-2 text-xs leading-4 text-[#334155] outline-none placeholder:text-[#6B7280] focus:border-[#2563EB]"
          />
        </div>

        <button
          type="button"
          onClick={submitReview}
          disabled={!unlocked || rating === 0}
          className={`inline-flex w-full items-center justify-center rounded-lg px-3 py-2 font-heading text-sm leading-4 font-semibold transition ${
            unlocked && rating > 0
              ? "bg-[#2563EB] text-white hover:bg-blue-700"
              : "cursor-not-allowed bg-[#E2E8F0] text-[#94A3B8]"
          }`}
        >
          Submit Review
        </button>
      </fieldset>
    </section>
  );
}
