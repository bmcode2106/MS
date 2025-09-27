// file: app/(main)/page.tsx

import HeroSection from "@/components/HeroSection";
import PlayerTester from "@/components/PlayerTester";
import DocumentationSection from "@/components/DocumentationSection";
import CommunitySection from "@/components/CommunitySection"; // NAMA IMPOR YANG BENAR

interface ApiVideo { id: number; poster_url: string; category: string[]; }
interface ApiResponse { list: ApiVideo[]; }
function shuffleArray(array: any[]) { for (let i = array.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]]; } return array; }

async function getPosters() {
  try {
    const keyword = "Big Breasts";
    const apiUrl = `https://avdbapi.com/api.php/provide/vod/?ac=detail&wd=${encodeURIComponent(keyword)}`;
    const fetchOptions = { cache: 'no-store' as RequestCache };
    const response = await fetch(apiUrl, fetchOptions);
    if (!response.ok) { throw new Error(`API request failed with status ${response.status}`); }
    const data: ApiResponse = await response.json();
    if (!data.list || data.list.length === 0) { console.warn(`No videos found for keyword: "${keyword}"`); return []; }
    const shuffledVideos = shuffleArray(data.list);
    return shuffledVideos.slice(0, 10).map(video => ({ id: video.id, url: video.poster_url }));
  } catch (error) {
    console.error("Error fetching posters:", error);
    return [];
  }
}

export default async function Home() {
  const initialPosters = await getPosters();

  return (
    <>
      <HeroSection initialPosters={initialPosters} />
      <PlayerTester />
      <DocumentationSection />
      <CommunitySection /> {/* NAMA KOMPONEN YANG BENAR */}
    </>
  );
}
