// file: components/Header.tsx
"use client";

import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

const Header = () => {
  // Fungsi untuk scroll mulus ke elemen
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <header className="fixed top-0 z-50 w-full px-4">
      <div className="w-full max-w-[70rem] mx-auto p-4 flex justify-between items-center">
        {/* Nama Brand */}
        <Link href="/" className="text-xl font-semibold text-transparent bg-gradient-to-br from-white to-gray-400 bg-clip-text">
          JAV Embed
        </Link>
        
        {/* Tombol Navigasi */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scrollTo('documentation')}
            className="px-3 py-1.5 text-sm text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-white/10"
          >
            Documentation
          </button>
          <button 
            onClick={() => scrollTo('player-tester')}
            className="px-3 py-1.5 text-sm text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-white/10"
          >
            <span className="flex items-center gap-1.5">
              Test Player
              <PlayCircle className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
