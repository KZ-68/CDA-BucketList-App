import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import Navbar from "@/components/Navbar";

import { mainFont, secondaryFont } from "../lib/utils";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`h-full  ${mainFont} ${secondaryFont} antialiased`}
      >
        <header>
          <Navbar />
        </header>
        <main className="py-12 pb-44 px-8  tracking-wide md:pt-24 md:w-3/4 m-auto">
          {children}
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
