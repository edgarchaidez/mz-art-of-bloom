import type { Metadata } from "next";
import { Lato, Great_Vibes, Josefin_Sans, Emilys_Candy } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["600"],
});

const emilysCandyFont = Emilys_Candy({
  variable: "--font-emilys-candy",
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: {
    default: "MZ Art of Bloom",
    template: "%s | MZ Art of Bloom",
  },
  description: "Handcrafted floral arrangements for birthdays, anniversaries, and every occasion. Based in Phoenix, AZ — local pickup, delivery, and nationwide shipping available.",
  keywords: ["floral arrangements", "flower bouquets", "Phoenix florist", "custom flowers", "artificial flowers", "birthday flowers", "anniversary bouquet"],
  openGraph: {
    siteName: "MZ Art of Bloom",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌸</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${greatVibes.variable} ${josefinSans.variable} ${emilysCandyFont.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
