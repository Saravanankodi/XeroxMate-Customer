
"use client";

import { useState } from "react";
import { CheckCheck, Clock, History } from "lucide-react";

const tickets = [
  {
    id: "#TK-8120",
    title: "Page 4 Missing in Spiral Binding",
    order: "Order OMX-3210",
    detail: "Full counter reprint issued at Cauvery Copy Point",
    status: "Resolved",
    date: "Recently updated",
  },
];

export default function TicketHistory() {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  return (
    <section className="rounded-2xl border border-white bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 font-heading text-base font-bold text-blue-950">
          <History size={17} className="text-blue-700" />
          Your Ticket History (Last 30 Days)
        </h2>

        <span className="text-xs font-semibold text-slate-500">
          1 resolved • 0 open
        </span>
      </div>

      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="flex flex-col justify-between gap-3 rounded-xl bg-indigo-50/80 p-3 sm:flex-row sm:items-center"
        >
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-200 text-teal-900">
              <CheckCheck size={17} />
            </span>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-slate-800">
                  {ticket.id} - {ticket.title}
                </span>

                <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-semibold text-teal-800">
                  {ticket.status}
                </span>
              </div>

              <p className="mt-1 text-xs leading-4 text-slate-500">
                {ticket.order} • {ticket.detail}
              </p>

              {selectedTicket === ticket.id && (
                <div className="mt-3 rounded-lg border border-indigo-100 bg-white p-3 text-xs text-slate-600">
                  <p className="font-semibold text-slate-800">Ticket details</p>
                  <p className="mt-1">Status: {ticket.status}</p>
                  <p className="mt-1">{ticket.detail}</p>
                  <p className="mt-1 flex items-center gap-1">
                    <Clock size={12} />
                    {ticket.date}
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              setSelectedTicket((current) =>
                current === ticket.id ? null : ticket.id
              )
            }
            className="self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-blue-800 hover:bg-blue-50 sm:self-center"
          >
            {selectedTicket === ticket.id ? "Hide Log" : "View Log"}
          </button>
        </div>
      ))}
    </section>
  );
}
