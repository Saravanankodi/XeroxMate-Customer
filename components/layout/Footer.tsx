
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#080c17] text-slate-400">
      <div className="mx-auto flex min-h-19 max-w-360 flex-col justify-between gap-4 px-5 py-5 sm:flex-row sm:items-center lg:px-8">
        <div className="text-[11px]">
          <span className="font-extrabold text-white">
            XEROX<span className="text-sky-400">MATE</span>
          </span>
          <span className="mx-3 text-slate-600">|</span>
          © 2026 XeroxMate Network Inc. All rights reserved.
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-[11px]">
          <Link href="/" className="hover:text-white">
            Data Privacy Policy
          </Link>
          <Link href="/" className="hover:text-white">
            Terms of Service
          </Link>
          <Link href="/" className="hover:text-white">
            Security Whitepaper
          </Link>
          <Link href="/" className="hover:text-white">
            Help Center
          </Link>
        </nav>
      </div>
    </footer>
  );
}
