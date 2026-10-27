
"use client";

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
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold text-slate-800">
          REVIEW TAMIL PRINTERS
        </h3>

        <span className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600">
          {unlocked ? "Open" : "Locked"}
        </span>
      </div>

      {!unlocked && (
        <div className="mt-4 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
          Reviews open automatically once Tamil Printers marks this order
          as Ready for Pickup.
        </div>
      )}

      <fieldset disabled={!unlocked} className="mt-4 disabled:opacity-60">
        <legend className="text-xs text-slate-500">
          How was your experience?
        </legend>

        <div className="mt-2 flex gap-1" aria-label="Rate your experience">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              aria-pressed={rating === star}
              className={`text-2xl ${
                star <= rating ? "text-amber-400" : "text-slate-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <label
          htmlFor="shop-review"
          className="mt-4 block text-xs text-slate-500"
        >
          Tell us about your experience (optional)
        </label>

        <textarea
          id="shop-review"
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          placeholder="Share your feedback..."
          rows={3}
          maxLength={1000}
          className="mt-2 w-full resize-y rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-blue-500"
        />

        <button
          type="button"
          onClick={submitReview}
          disabled={!unlocked || rating === 0}
          className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          Submit Review
        </button>
      </fieldset>
    </section>
  );
}
