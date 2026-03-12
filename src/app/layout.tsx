import type { Metadata } from "next";
import { Space_Grotesk, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { GsapProvider } from "@/components/animations/GsapProvider";
import { FloatingNavbar } from "@/components/FloatingNavbar";
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
      <head>
        <link href="https://fonts.cdnfonts.com/css/bogam" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${pressStart2P.variable} antialiased font-sans`}
      >
        <GsapProvider>
          <FloatingNavbar />
          {children}
          <Footer />
        </GsapProvider>
      </body>
    </html>
  );
}
