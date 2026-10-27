

import SupportTicketForm from "@/components/forms/SupportTicketForm";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import {
  SupportHero,
  SupportBenefits,
  FAQSection,
  ContactSupport,
  TicketHistory,
} from "@/components/support";

export const metadata = {
  title: "Help & Customer Support | XeroxMate",
  description:
    "Get help with XeroxMate print orders, pickup OTP, billing, and print quality.",
};

export default function SupportPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8f8fd]">
      <Header />

      <main className="mx-auto w-full max-w-[1320px] flex-1 px-5 pb-6 pt-4 lg:px-8">
        <div className="space-y-5">
          <SupportHero />

          <SupportBenefits />

          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.85fr_0.95fr]">
            <div className="min-w-0 space-y-5">
              <SupportTicketForm />
              <TicketHistory />
            </div>

            <aside className="min-w-0 space-y-5">
              <FAQSection />
              <ContactSupport />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
