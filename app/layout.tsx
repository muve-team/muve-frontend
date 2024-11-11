// app/layout.tsx

import "../styles/globals.css";
import { Noto_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import React from "react";
import ClientProviders from "@/components/ClientProviders";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className={notoSans.variable}>
      <body className="font-sans">
        <ClientProviders>
          {children}
        </ClientProviders>
        <Toaster />
      </body>
    </html>
  );
}
