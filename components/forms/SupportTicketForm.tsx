
"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  CloudUpload,
  Send,
  Ticket,
} from "lucide-react";

const quickFill = [
  {
    label: "Order Quality Issue",
    subject: "Print quality issue",
    category: "Order / Print Quality Issue",
  },
  {
    label: "Pickup OTP Issue",
    subject: "Unable to receive pickup OTP",
    category: "Pickup / OTP Issue",
  },
  {
    label: "Refund Query",
    subject: "Refund status enquiry",
    category: "Billing / Refund Query",
  },
  {
    label: "Shop Closed",
    subject: "Print shop closed on arrival",
    category: "Shop / Store Issue",
  },
];

const categories = [
  "Order / Print Quality Issue",
  "Pickup / OTP Issue",
  "Billing / Refund Query",
  "Shop / Store Issue",
  "Account / Login Issue",
  "Other",
];

export default function SupportTicketForm() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [subject, setSubject] = useState("");
  const [order, setOrder] = useState("OMX-3547");
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState("standard");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");

  function clearForm() {
    setSubject("");
    setOrder("OMX-3547");
    setCategory(categories[0]);
    setPriority("standard");
    setDescription("");
    setFiles([]);
    setStatus("");

    if (fileInput.current) {
      fileInput.current.value = "";
    }
  }

  function addFiles(selected: FileList | null) {
    if (!selected) return;

    const incoming = Array.from(selected);
    const allowed = incoming.filter((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      return (
        ["pdf", "jpg", "jpeg", "png"].includes(extension ?? "") &&
        file.size <= 10 * 1024 * 1024
      );
    });

    if (allowed.length !== incoming.length) {
      setStatus("Only PDF, JPG and PNG files up to 10 MB are allowed.");
    }

    setFiles((current) => [...current, ...allowed].slice(0, 5));
  }

  function submitTicket(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (description.trim().length < 20) {
      setStatus("Please enter at least 20 characters in the description.");
      return;
    }

    // Connect this handler to your backend API to persist tickets.
    const ticketData = {
      subject,
      order,
      category,
      priority,
      description,
      attachments: files.map((file) => file.name),
    };

    console.log("Support ticket submission:", ticketData);

    setStatus(
      "Your form is validated. Connect the ticket API to create your support ticket."
    );
  }

  return (
    <section className="rounded-2xl border border-white bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-start gap-3 border-b border-slate-100 pb-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
          <Ticket size={20} />
        </span>

        <div>
          <h2 className="font-serif text-xl font-bold text-blue-950">
            Raise a Support Ticket
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            We usually reply within a few hours (or minutes during exam windows).
          </p>
        </div>
      </div>

      <form onSubmit={submitTicket} className="mt-5 space-y-5">
        <div>
          <div className="mb-2 flex justify-between gap-2">
            <label htmlFor="ticket-subject" className="text-xs font-bold text-slate-800">
              Subject <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] text-slate-500">Be concise</span>
          </div>

          <input
            id="ticket-subject"
            required
            maxLength={120}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Short summary of the issue (e.g. Print alignment off on OMX-3547)"
            className="w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-slate-500">Quick Fill:</span>
            {quickFill.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setSubject(item.subject);
                  setCategory(item.category);
                  setStatus("");
                }}
                className="rounded-md bg-slate-100 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600 transition hover:bg-blue-100 hover:text-blue-900"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="related-order" className="mb-2 block text-xs font-bold text-slate-800">
              Related Order
            </label>
            <select
              id="related-order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="OMX-3547">OMX-3547 • Tamil Printers (₹1.50) - Current</option>
              <option value="OMX-3210">OMX-3210 • Cauvery Copy Point</option>
              <option value="other">Other / No related order</option>
            </select>
          </div>

          <div>
            <label htmlFor="ticket-category" className="mb-2 block text-xs font-bold text-slate-800">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="ticket-category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-700 outline-none focus:border-blue-500"
            >
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <fieldset>
          <legend className="mb-3 text-xs font-bold text-slate-800">
            Priority Urgency
          </legend>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className={`flex cursor-pointer items-start gap-2 rounded-xl border p-3 transition ${
              priority === "standard"
                ? "border-blue-100 bg-blue-100"
                : "border-slate-100 bg-slate-50 hover:border-slate-300"
            }`}>
              <input
                type="radio"
                name="priority"
                value="standard"
                checked={priority === "standard"}
                onChange={() => setPriority("standard")}
                className="mt-0.5 accent-blue-700"
              />
              <span>
                <span className="block text-xs font-bold text-slate-800">
                  Standard Resolution
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-slate-500">
                  Normal priority (response within 1–2 hours)
                </span>
              </span>
            </label>

            <label className={`flex cursor-pointer items-start gap-2 rounded-xl border p-3 transition ${
              priority === "urgent"
                ? "border-red-200 bg-red-50"
                : "border-slate-100 bg-slate-50 hover:border-slate-300"
            }`}>
              <input
                type="radio"
                name="priority"
                value="urgent"
                checked={priority === "urgent"}
                onChange={() => setPriority("urgent")}
                className="mt-0.5 accent-red-600"
              />
              <span>
                <span className="flex flex-wrap items-center gap-1.5 text-xs font-bold text-slate-800">
                  Urgent Submission
                  <span className="rounded bg-red-600 px-1.5 py-0.5 text-[9px] text-white">
                    Priority
                  </span>
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-slate-500">
                  Exam / Viva / Seminar submission in less than 2 hrs
                </span>
              </span>
            </label>
          </div>
        </fieldset>

        <div>
          <div className="mb-2 flex justify-between gap-2">
            <label htmlFor="ticket-description" className="text-xs font-bold text-slate-800">
              Description <span className="text-red-500">*</span>
            </label>
            <span className="text-[10px] text-slate-500">Min. 20 chars</span>
          </div>

          <textarea
            id="ticket-description"
            required
            minLength={20}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us what happened in detail. If this is a print defect, please mention paper weight, missing page numbers, ink smudging, or spiral binding status..."
            className="w-full resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm leading-5 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <div className="mb-2 flex flex-wrap justify-between gap-2">
            <label className="text-xs font-bold text-slate-800">
              Attach Photos / Proof <span className="font-normal text-slate-500">(Optional)</span>
            </label>
            <span className="text-[10px] text-slate-500">Max 10 MB per file (PDF, JPG, PNG)</span>
          </div>

          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFiles(e.dataTransfer.files);
            }}
            className="flex min-h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-blue-100 bg-indigo-50/80 px-4 py-5 text-center transition hover:border-blue-400 hover:bg-indigo-50"
          >
            <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-900">
              <CloudUpload size={22} />
            </span>
            <span className="text-xs font-semibold text-slate-800">
              Click or drag files here to attach proof
            </span>
            <span className="mt-1 text-[10px] text-slate-500">
              Helps our shop floor manager process reprints immediately without calling you.
            </span>
          </button>

          <input
            ref={fileInput}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />

          {files.length > 0 && (
            <ul className="mt-2 space-y-2">
              {files.map((file, index) => (
                <li key={`${file.name}-${index}`} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => setFiles((current) => current.filter((_, i) => i !== index))}
                    className="ml-3 font-semibold text-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {status && (
          <p role="status" aria-live="polite" className="rounded-lg bg-blue-50 px-3 py-3 text-xs leading-5 text-blue-900">
            {status}
          </p>
        )}

        <div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
          <p className="flex items-start gap-2 text-[10px] leading-4 text-slate-500">
            <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-blue-700" />
            Ticket updates will be sent to your registered email &amp; SMS.
          </p>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={clearForm}
              className="rounded-xl bg-indigo-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-indigo-100"
            >
              Clear
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-800 focus:ring-2 focus:ring-blue-300"
            >
              <Send size={14} />
              Submit Ticket
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
