import type { Metadata } from "next";
import { Lobster_Two, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const lobsterTwo = Lobster_Two({
  variable: "--font-lobster-two",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});


export const metadata: Metadata = {
  title: {
    default: "MZ Art of Bloom",
    template: "%s | MZ Art of Bloom",
  },
  description: "Phoenix florist handcrafting custom flower arrangements for birthdays, anniversaries, weddings, quinceañeras, and more. Fresh & artificial options — local pickup, Phoenix delivery, or nationwide shipping.",
  keywords: [
    "Phoenix florist", "florist near me", "flower arrangements Phoenix AZ",
    "custom floral arrangements", "birthday flowers", "anniversary bouquet",
    "wedding florist Phoenix", "quinceañera flowers", "artificial flower arrangements",
    "flower delivery Phoenix", "nationwide flower shipping",
  ],
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
    <html lang="en" className={`${lobsterTwo.variable} ${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
