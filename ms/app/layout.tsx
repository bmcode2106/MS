// file: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/Background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JAV Embed - The Ultimate JAV Streaming API",
  description: "A powerful and customizable JAV embed solution for developers, powered by the avdbapi.com API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // INI BARIS YANG DIPERBAIKI
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-gray-200`}>
        <Background />
        {children}
      </body>
    </html>
  );
}
