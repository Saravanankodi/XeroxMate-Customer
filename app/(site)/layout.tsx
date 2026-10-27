import { Suspense } from "react";
import Image from "next/image";

import BottomNav from "@/components/layout/BottomNav";
import Footer from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

function HeaderFallback() {
  return (
    <header className="mx-auto flex w-full max-w-360 items-center px-5 py-4 lg:px-8">
      <Image
        src="/images/xeroxmate-logo.png"
        alt="XeroxMate"
        width={155}
        height={52}
        priority
        className="h-auto w-28 object-contain sm:w-32"
      />
    </header>
  );
}

function BottomNavFallback() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 bottom-0 z-40 h-[calc(4.5rem+env(safe-area-inset-bottom))] border-t border-slate-200 bg-white md:hidden"
    />
  );
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Suspense fallback={<HeaderFallback />}>
        <Header />
      </Suspense>

      <div className="flex flex-1 flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        {children}
      </div>

      <Footer />

      <Suspense fallback={<BottomNavFallback />}>
        <BottomNav />
      </Suspense>
    </div>
  );
}
