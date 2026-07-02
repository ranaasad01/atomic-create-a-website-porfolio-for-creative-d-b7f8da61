import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "Mara Voss — Creative Designer",
  description:
    "Portfolio of Mara Voss, a creative designer crafting bold visual identities, editorial layouts, and digital experiences that refuse to blend in.",
  keywords: ["creative designer", "portfolio", "branding", "editorial", "UI/UX"],
  openGraph: {
    title: "Mara Voss — Creative Designer",
    description: "Bold visual identities and digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#0A0A0A] text-[#F5F5F5] antialiased selection:bg-[#FF4D00] selection:text-[#0A0A0A]">
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}