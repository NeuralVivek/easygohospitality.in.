"use client";

import { usePathname } from "next/navigation";
import { HomeHeader } from "@/components/HomeHeader";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHotelPage = pathname.startsWith("/click-tiger-den");

  return (
    <>
      {!isHotelPage && <HomeHeader />}
      {children}
    </>
  );
}