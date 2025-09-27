// file: components/PosterMarquee.tsx
"use client";

import Image from 'next/image';

interface PosterMarqueeProps {
  posters: { id: number; url: string }[];
  reverse?: boolean;
  duration?: string;
}

const PosterMarquee = ({ posters, reverse = false, duration = '40s' }: PosterMarqueeProps) => {
  if (!posters || posters.length === 0) return null;

  const animationClass = reverse ? 'animate-marquee-down' : 'animate-marquee-up';

  // Komponen kecil untuk me-render satu set poster
  const PosterSet = () => (
    <div 
      className={`flex flex-col shrink-0 justify-around [gap:var(--gap)] ${animationClass} group-hover:[animation-play-state:paused]`}
    >
      {posters.map((poster) => (
        <figure key={poster.id} className="relative h-52 w-36 cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1">
          <Image
            loading="lazy"
            fill
            src={poster.url}
            alt="JAV Poster"
            className="object-cover w-full h-full rounded-lg"
            sizes="150px"
          />
        </figure>
      ))}
    </div>
  );

  return (
    <div 
      className="group flex overflow-hidden flex-col"
      style={{ '--gap': '1rem', '--duration': duration } as React.CSSProperties}
    >
      {/* Render dua set poster secara terpisah, persis seperti blueprint */}
      <PosterSet />
      <PosterSet />
    </div>
  );
};

export default PosterMarquee;
