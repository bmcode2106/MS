// file: app/embed/code/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface AdConfig { enabled: boolean; clicks_needed: number; ad_tag_script_url: string; }
interface AppConfig { ads: AdConfig; }
interface VideoData { link_embed: string; poster_url: string; }

export default function EmbedPlayerPage() {
  const params = useParams();
  const javId = params.id as string;

  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [clickCount, setClickCount] = useState(0);
  const [adShown, setAdShown] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [config, setConfig] = useState<AppConfig | null>(null);

  useEffect(() => {
    if (!javId) {
      setError("JAV ID is missing.");
      setIsLoading(false);
      return;
    }

    const fetchAllData = async () => {
      try {
        const [configRes, videoRes] = await Promise.all([
          fetch('/config.json'),
          fetch(`https://avdbapi.com/api.php/provide/vod/?ac=detail&wd=${javId}`)
        ]);

        if (!configRes.ok) throw new Error('Failed to load ad configuration.');
        const configData = await configRes.json();
        setConfig(configData);

        if (!videoRes.ok) throw new Error(`API request failed with status ${videoRes.status}`);
        const videoApiData = await videoRes.json();

        if (videoApiData.list && videoApiData.list.length > 0) {
          const firstVideo = videoApiData.list[0];
          const linkEmbed = firstVideo.episodes?.server_data?.Full?.link_embed;
          const posterUrl = firstVideo.poster_url;

          if (linkEmbed && posterUrl) {
            setVideoData({ link_embed: linkEmbed, poster_url: posterUrl });
          } else {
            throw new Error('Embed link or poster not found in API response.');
          }
        } else {
          throw new Error(`No results found for ID: ${javId}`);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchAllData();
  }, [javId]);

  const handlePosterClick = () => {
    if (adShown) {
      setShowPlayer(true);
      return;
    }

    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    if (config?.ads.enabled && newClickCount >= config.ads.clicks_needed) {
      const script = document.createElement('script');
      script.src = config.ads.ad_tag_script_url;
      script.async = true;
      document.body.appendChild(script);
      setAdShown(true);
    }
    
    setShowPlayer(true);
  };
  
  if (isLoading) {
    return <div className="w-screen h-screen bg-black flex items-center justify-center text-gray-500">Loading Player...</div>;
  }

  if (error) {
    return <div className="w-screen h-screen bg-black flex items-center justify-center text-red-500 p-4 text-center">{error}</div>;
  }

  if (showPlayer && videoData?.link_embed) {
    return (
      <iframe
        src={videoData.link_embed}
        className="w-screen h-screen border-0"
        title="Video Player"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <div 
      className="w-screen h-screen bg-black cursor-pointer bg-cover bg-center"
      onClick={handlePosterClick}
      style={{ backgroundImage: `url(${videoData?.poster_url})` }}
    >
      <div className="w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm hover:bg-black/30 transition-colors">
        <svg className="w-24 h-24 text-white/70" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
        </svg>
      </div>
    </div>
  );
}
