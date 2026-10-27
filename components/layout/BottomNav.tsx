
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  ClipboardList,
  ClipboardCheck,
  LifeBuoy,
  UserRound,
} from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: House },
  { label: "New Order", href: "/order", icon: ClipboardList },
  { label: "My Orders", href: "/my-orders", icon: ClipboardCheck },
  { label: "Support", href: "/support", icon: LifeBuoy },
  { label: "Profile", href: "/profile", icon: UserRound },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white px-1 pt-2 pb-[max(8px,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(15,23,42,0.08)] md:hidden"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-0.5 py-1.5 transition-colors ${
                active
                  ? "text-blue-900"
                  : "text-neutral-800 hover:text-blue-800"
              }`}
            >
              <Icon
                size={29}
                strokeWidth={2.4}
                aria-hidden="true"
              />

              <span className="whitespace-nowrap text-[11px] font-semibold min-[380px]:text-sm">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
