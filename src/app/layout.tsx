import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { SkipToContent } from "@/components/SkipToContent";
import { BackToTop } from "@/components/BackToTop";
import { COMPANY, QUOTE_EMAIL, SITE_PITCH, SITE_URL } from "@/lib/company";
import { CORE_KEYWORDS } from "@/lib/seo";
import "./globals.css";

const ibmSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  adjustFontFallback: true,
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY} — Wire Forming Resource for the United States and Beyond`,
    template: `%s — ${COMPANY}`,
  },
  description: SITE_PITCH,
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
    title: `${COMPANY} — Wire Forming Resource for the United States and Beyond`,
    description: SITE_PITCH,
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY} — Wire Forming Resource for the United States and Beyond`,
    description: SITE_PITCH,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ibmSans.variable} ${ibmMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="dns-prefetch" href="https://www.youtube.com" />
      </head>
      <body className="flex min-h-full flex-col pb-16 font-sans sm:pb-0">
        <SkipToContent />
        <JsonLd />
        <Header />
        <div id="main-content" className="flex-1">
          {children}
        </div>
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
