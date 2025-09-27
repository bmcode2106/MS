// file: components/HeroSection.tsx
"use client";

import { StatCard } from './StatCard';
import PosterMarquee from './PosterMarquee';

interface Poster {
  id: number;
  url: string;
}

interface HeroSectionProps {
  initialPosters: Poster[];
}

const HeroSection = ({ initialPosters }: HeroSectionProps) => {
  
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  // BAGI 10 POSTER MENJADI 2 KOLOM (MASING-MASING 5)
  const column1 = initialPosters.slice(0, 5);
  const column2 = initialPosters.slice(5, 10);

  return (
    <section className="relative flex items-center justify-center w-full min-h-screen overflow-hidden px-4 py-20">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 z-10 flex-shrink-0">
          <h1 className="text-5xl md:text-7xl font-semibold text-transparent bg-gradient-to-br from-white to-gray-400 bg-clip-text">
            JAV Embed
          </h1>
          <h2 className="text-4xl md:text-5xl max-w-md bg-gradient-to-br from-white to-indigo-400 bg-clip-text text-transparent leading-tight">
            The Ultimate JAV Streaming API
          </h2>
          <p className="text-gray-400 max-w-md mt-2">
            Effortlessly embed high-quality JAV content with a powerful, customizable, and developer-friendly API.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
            <button
              onClick={() => scrollTo('documentation')}
              className="px-6 py-2.5 font-medium backdrop-blur-xl transition duration-300 ease-in-out hover:shadow-indigo-500/20 hover:shadow-2xl bg-white/10 rounded-full text-white/90"
            >
              Get Started
            </button>
            <button
              onClick={() => scrollTo('player-tester')}
              className="text-sm underline capitalize transition-all text-white/80 hover:text-white hover:scale-105 active:scale-95"
            >
              Test the Player
            </button>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
            <StatCard count="15K+" category="Censored" />
            <StatCard count="10K+" category="Uncensored" />
            <StatCard count="5K+" category="Amateur" />
          </div>
        </div>

        <div className="relative flex h-[500px] w-full max-w-sm flex-row items-center justify-center overflow-hidden">
          <div className="flex w-full justify-center gap-4">
            <PosterMarquee posters={column1} duration="40s" />
            <PosterMarquee posters={column2} duration="40s" reverse={true} />
          </div>
          
          <div className="absolute inset-x-0 top-0 pointer-events-none h-1/4 bg-gradient-to-b from-black"></div>
          <div className="absolute inset-x-0 bottom-0 pointer-events-none h-1/4 bg-gradient-to-t from-black"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
