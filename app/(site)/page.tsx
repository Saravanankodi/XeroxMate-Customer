import type { Metadata } from "next";

import { Card, Label } from "@/components/ui";
import DocumentUpload from "@/components/ui/DocumentUpload";
import { Fillter, Location, QrCode, Thander } from "@/components/icons";
import {ShieldCheck, Target, } from "lucide-react";



export const metadata: Metadata = {
  title: "Smart Campus Printing",
};

const LABELS_LIST = [
  {
    icon: <ShieldCheck className="h-5 w-5 text-[#34D399] " />,
    text: "Auto-purge file privacy",
  },
  {
    icon: <Thander className="h-5 w-5 text-[#FBBF24] " />,
    text: "Skip all shop queues",
  },
  {
    icon: <Target className="h-5 w-5 text-[#38BDF8] " />,
    text: "Instant price compare",
  },
];

const CARDS_STEPS = [
  {
    id: 1,
    title: "Upload & Configure",
    description:
      "Upload assignments, blueprints, or brochures. Configure color options, 75–100 GSM paper weight, spiral binding, and duplex settings seamlessly.",
    icon: <Fillter className="h-5 w-5" />,
    spanText: "Real-time instant live preview",
  },
  {
    id: 2,
    title: "Compare Shops & Prices",
    description:
      "Scan rated xerox hubs around your campus or neighborhood. Compare per-page rates, estimated completion queues, and opt for self-pickup or hostel delivery.",
    icon: <Location className="h-5 w-5" />,
    spanText: "Geo-located hub selection",
  },
  {
    id: 3,
    title: "Zero-Queue Pickup",
    description:
      "Receive a live OTP / QR-code ping when your bundle is stapled and ready. Flash your pass, collect your order instantly, and walk away happy.",
    icon: <QrCode className="h-5 w-5" />,
    spanText: "Quick QR pick-up release",
  },
];

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col font-sans">
      <section className="mx-auto flex w-full max-w-screen flex-col items-center justify-center gap-8 px-5 py-6 lg:flex-row lg:items-center lg:gap-6 lg:px-8">
        <main className="flex w-full min-w-0 flex-col gap-5 lg:flex-1">
          <Label dot dotColor="bg-success">
            Tamil Nadu&apos;s #1 Digital Printing Network
          </Label>
          <h1 className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-[64px] lg:leading-18">
            Your Smart Printing
            <span className="block text-primary">Partner &amp; Network.</span>
          </h1>
          <p className="max-w-2xl text-lg text-secondary">
            Say goodbye to print shop queues and USB pendrives. Upload
            digitally, customize paper weights &amp; bindings, compare nearby
            print hubs, and pickup with zero wait time or get doorstep
            delivery.
          </p>

          <aside className="mt-3 flex w-full flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            {LABELS_LIST.map((label) => (
              <div
                className="flex items-center justify-center gap-2"
                key={label.text}
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  {label.icon}
                </span>
                <p className="text-base font-medium">{label.text}</p>
              </div>
            ))}
          </aside>
        </main>

        <div className="w-full lg:w-2/5">
          <DocumentUpload multiple />
        </div>
      </section>

      <aside className="mx-auto hidden md:grid w-full max-w-screen grid-cols-2 gap-3 border-y border-slate-200 px-5 py-3 sm:grid-cols-4">
        <div className="w-full px-2 py-1">
          <h2 className="text-center font-heading text-[32px] font-extrabold">
            50+
          </h2>
          <p className="text-center text-sm">VERIFIED PRINT HUBS</p>
        </div>
        <div className="w-full px-2 py-1 sm:border-l sm:border-slate-200">
          <h2 className="text-center font-heading text-[32px] font-extrabold">
            2.4M+
          </h2>
          <p className="text-center text-sm">PAGES PRINTED</p>
        </div>
        <div className="w-full px-2 py-1 sm:border-l sm:border-slate-200">
          <h2 className="text-center font-heading text-[32px] font-extrabold">
            &#60; 5 Min
          </h2>
          <p className="text-center text-sm">ZERO-WAIT EXPRESS PICKUP</p>
        </div>
        <div className="w-full px-2 py-1 sm:border-l sm:border-slate-200">
          <h2 className="text-center font-heading text-[32px] font-extrabold">
            100%
          </h2>
          <p className="text-center text-sm">REPRINT GUARANTEE</p>
        </div>
      </aside>

      <section className="mx-auto hidden md:block w-full max-w-screen px-5 py-6 lg:px-8">
        <p className="text-center text-base font-bold text-primary">
          EFFORTLESS WORKFLOW
        </p>
        <h2 className="text-center text-[34px] font-extrabold">
          Printing made modern in 3 easy steps
        </h2>
        <main className="mt-5 grid w-full grid-cols-1 items-stretch justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS_STEPS.map((card) => (
            <Card className="flex h-full flex-col gap-2" key={card.id}>
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border bg-white text-xl font-bold">
                0{card.id}
              </span>
              <h3 className="pb-3 text-xl font-bold">{card.title}</h3>
              <p className="flex-1 pb-4 text-base">{card.description}</p>
              <span className="flex items-center gap-2 border-t border-slate-200 py-2">
                {card.icon}
                {card.spanText}
              </span>
            </Card>
          ))}
        </main>
      </section>
    </div>
  );
}
