// components/Navbar.js
"use client";

import Link from "next/link";
import { logout } from "@/lib/auth";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Scores", href: "/scores" },
    { name: "Subscribe", href: "/subscribe" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-2xl shadow-lg shadow-emerald-500/20">
            ⛳
          </div>
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            Golf<span className="text-emerald-400">Pro</span>
          </Link>
        </div>

        <div className="hidden md:block">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                  pathname === link.href ? "text-emerald-400" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
            className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-all hover:bg-white/10 hover:text-white border border-white/10"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}