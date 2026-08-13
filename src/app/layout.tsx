import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { COMPANY, SITE_URL } from "@/lib/company";
import { CORE_KEYWORDS } from "@/lib/seo";
import "./globals.css";

const ibmSans = IBM_Plex_Sans({
  variable: "--font-ibm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY} — 4–14 mm 3D CNC Wire Forming`,
    template: `%s — ${COMPANY}`,
  },
  description:
    `${COMPANY}: 4–14 mm 3D CNC wire forming in Northeast Ohio — frames, wire baskets, guards, design rules, and process selection.`,
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
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: COMPANY,
    title: `${COMPANY} — 4–14 mm 3D CNC Wire Forming`,
    description:
      "3D CNC wire forming in 4–14 mm: frames, wire baskets, and guards. Northeast Ohio.",
  },
  twitter: {
    card: "summary",
    title: `${COMPANY} — 4–14 mm 3D CNC Wire Forming`,
    description:
      "3D CNC wire forming in 4–14 mm: frames, wire baskets, and guards. Northeast Ohio.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ibmSans.variable} ${ibmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
