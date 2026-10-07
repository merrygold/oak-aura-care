import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealScript } from "@/components/RevealScript";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Oak & Aura Care | Support centred on you",
    template: "%s | Oak & Aura Care",
  },
  description:
    "Personalised disability, aged care and youth support that builds confidence, choice and everyday independence.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://oak-aura-care.vercel.app",
  ),
  openGraph: {
    title: "Oak & Aura Care | Support centred on you",
    description: "Warm, practical support for disability, aged care and everyday living.",
    type: "website",
    siteName: "Oak & Aura Care",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oak & Aura Care | Support centred on you",
    description: "Warm, practical support for disability, aged care and everyday living.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${manrope.variable} antialiased`}>
        <div className="min-h-screen bg-background font-body text-foreground">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
        <RevealScript />
      </body>
    </html>
  );
}
