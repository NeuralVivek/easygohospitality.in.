import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { HomeHeader } from "@/components/HomeHeader";
import VisitorTracker from "@/components/VisitorTracker";
import SiteLayout from "@/components/SiteLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://easygohospitality.in"),
  title: {
    default: "easygohospitality.in | Premium India Hotel Discovery",
    template: "%s | easygohospitality.in",
  },
  description:
    "Discover premium stays in India, from heritage hotels to beach resorts, villas and luxury city escapes.",
  verification: {
    google: "ss3f6EpkwFrmb2xUjPnwyWDAC0_gk7aZYucrv4fDzBk",
  },
  keywords: [
    "hotels in India",
    "premium stays",
    "luxury hotel booking",
    "villas in India",
    "hotel deals",
  ],
  openGraph: {
    title: "easygohospitality.in",
    description: "Luxury and premium hotel discovery across India.",
    url: "https://easygohospitality.in",
    siteName: "easygohospitality.in",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "easygohospitality.in",
    description: "Luxury and premium hotel discovery across India.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full bg-[#ffffff] text-[#111111]">
        {/* <VisitorTracker />
        <HomeHeader />
        {children} */}
        <VisitorTracker />
<SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
