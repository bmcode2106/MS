// file: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Background } from "@/components/Background";
import Header from "@/components/Header"; // 1. Impor komponen Header

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JAV Embed - The Ultimate JAV Streaming API",
  description: "A powerful and customizable JAV embed solution for developers, powered by the avdbapi.com API.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-gray-200`}>
        <Background />
        <Header /> {/* 2. Tambahkan komponen Header di sini */}
        {children}
      </body>
    </html>
  );
}
