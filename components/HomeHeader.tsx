"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  ["Home", "/"],
  ["Destinations", "/#popular-destinations"],
  ["Hotels", "/#hot-deals"],
  ["Offers", "/hotels"],
  ["Travel Partners", "/#travel-partners"],
  ["About Us", "#lead-form"],
] as const;

export function HomeHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isStandaloneResortPage =
    pathname === "/corbett-resort-event" ||
    pathname === "/hotel/click-resort-corbett-tiger-den";

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (isStandaloneResortPage) return null;

  const isActive = (label: string) => {
    if (label === "Home") return isHomePage;
    if (label === "Destinations") return pathname.startsWith("/destinations");
    if (label === "Hotels") return pathname.startsWith("/hotel") || pathname === "/hotels";
    if (label === "Offers") return pathname === "/hotels";
    return false;
  };

  return (
    <header className="relative z-50 border-b border-[#e7e7e7] bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <nav className="editorial-shell flex min-h-[72px] items-center justify-between gap-5 sm:min-h-20" aria-label="Primary navigation">
        <Link
          href="/"
          className="shrink-0 inline-flex items-center"
          aria-label="EasyGo Hospitality home"
        >
          <span className="inline-flex w-fit items-center">
    <Image
      src="/Gemini_Generated_Image_z0ip15z0ip15z0ip.png"
      alt="EasyGo Hospitality"
      width={170}
      height={96}
      priority
      className="block h-12 w-auto object-contain sm:h-14"
    />
          </span>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-[#111111] lg:flex xl:gap-8">
          {navigation.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              aria-current={isActive(label) ? "page" : undefined}
              className={`relative py-2 transition-colors hover:text-[#666666] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-[#111111] after:transition-transform ${isActive(label) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {/* <Link href="#lead-form" className={`text-sm font-medium transition-colors hover:text-[#333333] ${isHomePage ? "text-white/90" : "text-[#111111]"}`}>
            Login / Register
          </Link> */}
          <Link href="https://wa.me/918595661099" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-[#111111] px-5 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#444444]">
            Contact us
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d5d5d5] text-[#111111] transition hover:bg-[#f7f7f7] md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div id="mobile-navigation" className="absolute inset-x-0 top-full max-h-[calc(100vh-72px)] overflow-y-auto border-t border-[#dddddd] bg-white shadow-[0_18px_35px_rgba(0,0,0,0.12)] md:hidden">
          <div className="editorial-shell flex animate-[hero-copy-in_220ms_ease-out_both] flex-col gap-1 py-4">
            {navigation.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setIsOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-[#444444] hover:bg-[#f7f7f7]">
                {label}
              </Link>
            ))}
            <a
              href={`https://api.whatsapp.com/send?phone=918595661099&text=${encodeURIComponent("Hello Team EasyGo Hospitality")}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-xl bg-[#111111] px-3 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white"
            >
              Contact us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
