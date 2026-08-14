import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { COMPANY, QUOTE_EMAIL, SITE_URL } from "@/lib/company";
import { PRICE_LINE } from "@/lib/price";
import { CORE_KEYWORDS } from "@/lib/seo";
import "./globals.css";

const ibmSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY} — 4–14 mm 3D CNC Wire Forming`,
    template: `%s — ${COMPANY}`,
  },
  description:
    `${COMPANY}: 4–14 mm 3D CNC wire forming in Northeast Ohio. ${PRICE_LINE} Frames, wire baskets, guards, design rules, and process selection.`,
  keywords: CORE_KEYWORDS,
  authors: [{ name: COMPANY, url: SITE_URL }],
  creator: COMPANY,
  publisher: COMPANY,
  category: "manufacturing",
  applicationName: COMPANY,
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    "contact:email": QUOTE_EMAIL,
    // Geo-targeting for Northeast Ohio / USA
    "geo.region": "US-OH",
    "geo.placename": "Cleveland",
    "geo.position": "41.4993;-81.6944",
    "ICBM": "41.4993, -81.6944",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: COMPANY,
    title: `${COMPANY} — 4–14 mm 3D CNC Wire Forming`,
    description:
      `3D CNC wire forming in 4–14 mm: frames, wire baskets, and guards. ${PRICE_LINE} Northeast Ohio.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY} — 4–14 mm 3D CNC Wire Forming`,
    description:
      `3D CNC wire forming in 4–14 mm: frames, wire baskets, and guards. ${PRICE_LINE} Northeast Ohio.`,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ibmSans.variable} ${ibmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col pb-16 font-sans sm:pb-0">
        <JsonLd />
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
