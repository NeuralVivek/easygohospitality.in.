import type { Metadata } from "next";

const pageUrl = "https://easygohospitality.in/click-tiger-den";

export const metadata: Metadata = {
  title: "Destination Wedding Resort in Jim Corbett | Tiger Den",
  description:
    "Plan a destination wedding in Jim Corbett at Click Resort Corbett Tiger Den. Explore wedding venues, guest accommodation and custom wedding packages.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Destination Wedding Resort in Jim Corbett | Tiger Den",
    description:
      "Plan a destination wedding in Jim Corbett with wedding spaces, accommodation and a personalised package from Click Resort Corbett Tiger Den.",
    url: pageUrl,
    siteName: "EasyGo Hospitality",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1587271636175-90d58cdad458?auto=format&fit=crop&w=1200&q=85",
        alt: "Destination wedding celebration at Click Resort Corbett Tiger Den",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Destination Wedding Resort in Jim Corbett | Tiger Den",
    description:
      "Plan a destination wedding in Jim Corbett with wedding spaces, accommodation and a personalised package from Click Resort Corbett Tiger Den.",
    images: [
      "https://images.unsplash.com/photo-1587271636175-90d58cdad458?auto=format&fit=crop&w=1200&q=85",
    ],
  },
};

export default function TigerDenLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
