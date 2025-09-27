// file: components/Header.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 w-full px-4 transition-all duration-300 ease-in-out ${
        isScrolled ? 'pt-2' : 'pt-0'
      }`}
    >
      <div 
        className={`w-full max-w-[70rem] mx-auto p-4 flex justify-between items-center transition-all duration-300 ease-in-out ${
          isScrolled
            // UBAH WARNA BLUR DARI bg-black/50 MENJADI bg-zinc-900/50
            ? 'bg-zinc-900/50 backdrop-blur-lg border border-white/10 rounded-2xl'
            : 'bg-transparent border-transparent'
        }`}
      >
        <Link href="/" className="text-xl font-semibold text-transparent bg-gradient-to-br from-white to-gray-400 bg-clip-text">
          JAV Embed
        </Link>
        
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
