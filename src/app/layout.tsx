import type { Metadata } from "next";
import { Space_Grotesk, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { GsapProvider } from "@/components/animations/GsapProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start-2p",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trooper | Anti-Agency",
  description: "High-end web design agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${pressStart2P.variable} antialiased font-sans`}
      >
        <GsapProvider>
          <Navbar />
          {children}
          <Footer />
        </GsapProvider>
      </body>
    </html>
  );
}
