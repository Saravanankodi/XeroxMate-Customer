"use client";
import { Header } from "@/components/layout/Header";
import { Card, Label } from "@/components/ui";
import DocumentUpload from "@/components/ui/DocumentUpload";
import { Filter, Power, Shield } from "lucide-react";

const LABLES_LIST = [
  {
    icon:<Shield className="w-5 h-5"/>,
    text:"Auto-purge file privacy"
  },
  {
    icon:<Power className="w-5 h-5"/>,
    text:"Skip all shop queues"
  },
  {
    icon:<Shield className="w-5 h-5"/>,
    text:"Instant price compare"
  },
]

const CAEDS_STEPS = [
  {
    id: 1,
    tittle:"Upload & Configure",
    disc:"Upload assignments, blueprints, or brochures.Configure color options, 75–100 GSM paper weight, spiral binding, and duplex settings seamlessly.",
    icon: <Filter className="w-3 h-3"/>,
    spanText:"Real-time instant live preview"
  },
  {
    id: 2,
    tittle:"Compare Shops & Prices",
    disc:"Scan rated xerox hubs around your campus or neighborhood. Compare per-page rates, estimated completion queues, and opt for self-pickup or hostel delivery.",
    icon: <Filter className="w-3 h-3"/>,
    spanText:"Geo-located hub selection"
  },
  {
    id: 3,
    tittle:"Zero-Queue Pickup",
    disc:"Receive a live OTP / QR-code ping when your bundle is stapled and ready. Flash your pass, collect your order instantly, and walk away happy.",
    icon: <Filter className="w-3 h-3"/>,
    spanText:"Quick QR pick-up release"
  },
]
export default function Home() {
  return (
    <div className="w-full flex flex-col flex-1 items-center gap-5 justify-center bg-zinc-50 font-sans">
      <Header/>
      <section className="w-full flex flex-col items-center justify-center gap-8 p-5 lg:flex-row lg:gap-6">
        <main className="w-full sm:flex-1 flex flex-col gap-5">
            <Label dot dotColor='bg-success'>
                Tamil Nadu's #1 Digital Printing Network
            </Label>
            <h2 className="font-heading text-4xl leading-tight font-extrabold sm:text-5xl lg:text-[64px] lg:leading-18">
                Your Smart Printing
                <span className="block text-primary">
                    Partner & Network.
                </span>
            </h2>
            <p className="text-lg text-secondary max-w-2xl  ">
                Say goodbye to print shop queues and USB pendrives. Upload digitally, customize paper weights & bindings, compare nearby print hubs, and pickup with zero wait time or get doorstep delivery.
            </p>

            <aside className="w-full mt-3 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              {
                LABLES_LIST.map((lable,index)=>(
                  <div className="flex gap-2 items-center justify-center" key={index}>
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      {lable.icon}
                    </span>
                    <p className="text-base font-medium ">
                      {lable.text}
                    </p>
                  </div>
                ))
              }
            </aside>
        </main>
        <div className="w-full sm:max-w-2/5">
              <DocumentUpload
                multiple
                onFilesSelected={(files) => {
                  console.log("Selected files:", files);
                }}
              />
        </div>
      </section>
      <aside className="w-full grid grid-cols-2 border-y border-slate-200 px-2 py-3 gap-3 sm:grid-cols-4">
        <div className="w-full px-2 py-1">
          <h2 className="text-[32px] font-extrabold font-heading text-center ">
            50+
          </h2>
          <p className="text-sm text-center">
            VERIFIED PRINT HUBS
          </p>
        </div>
        <div className="w-full px-2 py-1 sm:border-l sm:border-slate-200">
          <h2 className="text-[32px] font-extrabold font-heading text-center ">
            2.4M+
          </h2>
          <p className="text-sm text-center">
            PAGES PRINTED
          </p>
        </div>
        <div className="w-full px-2 py-1 sm:border-l sm:border-slate-200">
          <h2 className="text-[32px] font-extrabold font-heading text-center ">
            &#60; 5 Min
          </h2>
          <p className="text-sm text-center">
            ZERO-WAIT EXPRESS PICKUP
          </p>
        </div>
        <div className="w-full px-2 py-1 sm:border-l sm:border-slate-200">
          <h2 className="text-[32px] font-extrabold font-heading text-center ">
            100%
          </h2>
          <p className="text-sm text-center">
            REPRINT GUARANTEE
          </p>
        </div>
      </aside>
      <section className="w-full p-5">
        <p className="text-base font-bold text-primary text-center">
          EFFORTLESS WORKFLOW
        </p>
        <h3 className="text-[34px] text-center font-extrabold">
          Printing made modern in 3 easy steps
        </h3>
        <main className="w-full grid grid-cols-1 items-stretch justify-center gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3">
          {
            CAEDS_STEPS.map((card)=>(
              <Card className="h-full flex flex-col gap-2" key={card.id}>
                <span className="h-10 w-10  text-xl font-footer font-bold flex items-center justify-center rounded-xl mb-3 bg-white border">
                  0{card.id}
                </span>
                <h2 className="text-xl font-bold pb-3">
                  {card.tittle}
                </h2>
                <p className="text-base pb-4 flex-1">
                  {card.disc}
                </p>
                <span className="flex items-center py-2 gap-2 border-t border-slate-200">
                  {card.icon}
                  {card.spanText}
                </span>
              </Card>
            ))
          }
        </main>
      </section>
    </div>
  );
}
