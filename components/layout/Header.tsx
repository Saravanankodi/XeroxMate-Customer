"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home", href: "/" },
  { label: "New Order", href: "/order" },
  { label: "My Orders", href: "/my-orders" },
  { label: "Support", href: "/support" },
  { label: "Profile", href: "/profile" },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative z-10 mx-auto flex w-full max-w-360 items-center justify-between gap-4 px-5 py-4 lg:px-8">
      <Link
        href="/"
        className="shrink-0"
        aria-label="XeroxMate home"
      >
        <Image
          src="/images/xeroxmate-logo.png"
          alt="XeroxMate"
          width={155}
          height={52}
          priority
          className="h-auto w-28 object-contain sm:w-32"
        />
      </Link>

      <nav className="hidden items-center gap-1 md:flex">
        {navItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={[
                "rounded-full px-3 py-2 text-base font-medium",
                "transition-colors",
                active
                  ? "bg-slate-700 text-white"
                  : "text-slate-700 hover:bg-slate-200/70",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-700 hover:bg-slate-200/70"
        >
          <Bell size={17} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sky-500" />
        </button>

        <button
          type="button"
          className="hidden items-center gap-1.5 text-xs text-slate-700 hover:text-sky-600 sm:flex"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </header>
  );
}
