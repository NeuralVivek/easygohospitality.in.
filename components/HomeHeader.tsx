"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigation = [
  ["Home", "/"],
  ["Destinations", "/#popular-destinations"],
  ["Hotels", "/#hot-deals"],
  ["Offers", "/hotels"],
  ["About Us", "#lead-form"],
] as const;

export function HomeHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isStandaloneResortPage =
    pathname === "/corbett-resort-event" ||
    pathname === "/hotel/click-resort-corbett-tiger-den";

  if (isStandaloneResortPage) return null;

  return (
    <header className={`inset-x-0 top-0 z-50 ${isHomePage ? "absolute bg-transparent" : "relative border-b border-[#dddddd] bg-white"}`}>
      <nav className="editorial-shell flex min-h-20 items-center justify-between gap-6" aria-label="Primary navigation">
        <Link
          href="/"
          className="shrink-0 inline-flex items-center"
          aria-label="EasyGo Hospitality home"
        >
          <span className="inline-flex w-fit items-center">
    <Image
      src="/logo-transparent.png"
      alt="EasyGo Hospitality"
      width={170}
      height={96}
      priority
      className="block h-14 w-auto object-contain sm:h-16"
    />
          </span>
        </Link>

        <div className={`hidden items-center gap-8 text-sm font-medium lg:flex ${isHomePage ? "text-white/90" : "text-[#111111]"}`}>
          {navigation.map(([label, href]) => (
            <Link key={label} href={href} className="transition-colors hover:text-[#ffffff]">
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {/* <Link href="#lead-form" className={`text-sm font-medium transition-colors hover:text-[#333333] ${isHomePage ? "text-white/90" : "text-[#111111]"}`}>
            Login / Register
          </Link> */}
          <Link href="https://wa.me/918595661099" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#111111] transition hover:bg-[#f7f7f7]">
            Contact us
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((open) => !open)}
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full md:hidden ${isHomePage ? "border border-white/40 text-white" : "border border-[#d5d5d5] text-[#111111]"}`}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-navigation" className="border-t border-[#dddddd] bg-white md:hidden">
          <div className="editorial-shell flex flex-col gap-1 py-4">
            {navigation.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setIsOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-[#444444] hover:bg-[#f7f7f7]">
                {label}
              </Link>
            ))}
            <Link href="#lead-form" onClick={() => setIsOpen(false)} className="mt-2 rounded-xl border border-[#dddddd] px-3 py-3 text-sm font-medium text-[#444444]">
              Login / Register
            </Link>
            {/* <Link href="https://wa.me/918595661099?text=" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="mt-1 rounded-xl bg-white px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#111111]">
              Contact us
            </Link> */}
         <a
  href={`https://api.whatsapp.com/send?phone=918595661099&text=${encodeURIComponent(
    "Hello Team EasyGo Hospitality"
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => setIsOpen(false)}
  className="mt-1 rounded-xl bg-white px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#111111]"
>
  Contact us
</a>
        
          </div>
        </div>
      )}
    </header>
  );
}
