// file: app/(main)/layout.tsx

import { Background } from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; // Jangan lupa footer

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Background />
      <Header />
      {children}
      {/* Kita akan buat Footer di langkah berikutnya */}
    </>
  );
}
