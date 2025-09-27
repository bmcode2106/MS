// file: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Metadata dipindahkan ke sini karena ini adalah layout root
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
      {/* Body ini sekarang bersih, hanya berisi children dari layout grup */}
      <body className={`${inter.className} bg-black text-gray-200`}>
        {children}
      </body>
    </html>
  );
}
