// file: components/PlayerTester.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import { FeatureCard } from './FeatureCard';
import { Rocket, Library, WandSparkles, Copy, Check, Search, RefreshCw } from 'lucide-react';

function debounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  return function(...args: Parameters<T>) {
    if (timeoutId) { clearTimeout(timeoutId); }
    timeoutId = setTimeout(() => { func(...args); }, delay);
  };
}

// Tipe untuk metode pencarian
type SearchMethod = 'code' | 'id';

const PlayerTester = () => {
  const [searchValue, setSearchValue] = useState('MIDA-321');
  const [searchMethod, setSearchMethod] = useState<SearchMethod>('code');
  
  const [generatedEmbedUrl, setGeneratedEmbedUrl] = useState('');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [domain, setDomain] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setDomain(window.location.origin);
  }, []);

  const fetchPreviewUrl = async (value: string, method: SearchMethod) => {
    if (!value) return;
    setIsLoading(true);
    setError(null);
    setPreviewSrc(null);

    // Tentukan parameter API berdasarkan metode pencarian
    const apiParam = method === 'code' ? 'wd' : 'ids';
    const apiUrl = `https://avdbapi.com/api.php/provide/vod/?ac=detail&${apiParam}=${value}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('API request failed.');
      const data = await response.json();
      if (data.list && data.list.length > 0) {
        const linkEmbed = data.list[0].episodes?.server_data?.Full?.link_embed;
        if (linkEmbed) {
          setPreviewSrc(linkEmbed);
        } else {
          throw new Error('Embed link not found in API response.');
        }
      } else {
        throw new Error(`No results found for ${method}: ${value}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetch = useCallback(debounce(fetchPreviewUrl, 500), []);

  useEffect(() => {
    if (isClient && searchValue) {
      // Buat URL embed kita sendiri berdasarkan metode pencarian
      const urlPath = `/embed/${searchMethod}/${searchValue}`;
      setGeneratedEmbedUrl(`${domain}${urlPath}`);
      debouncedFetch(searchValue, searchMethod);
    }
  }, [isClient, domain, searchValue, searchMethod, debouncedFetch]);
  
  const handleCopy = () => {
    if (!generatedEmbedUrl) return;
    navigator.clipboard.writeText(generatedEmbedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMethodChange = (method: SearchMethod) => {
    setSearchMethod(method);
    // Ganti nilai contoh saat tab diubah
    if (method === 'code') {
      setSearchValue('MIDA-321');
    } else {
      setSearchValue('421077');
    }
  };

  return (
    <section id="player-tester" className="flex max-w-[70rem] flex-col items-center w-full min-h-screen gap-4 p-4">
      <div className="flex flex-col gap-4 mt-20 text-center w-full max-w-2xl">
        <h2 className="text-3xl font-bold">Test The Player</h2>
        <p className="text-gray-400">Enter a JAV ID Code or Numeric ID to generate an embed link and see a live preview.</p>
        
        {/* TAB PEMILIHAN METODE */}
        <div className="flex justify-center p-1 bg-white/5 rounded-full mt-4">
          <button 
            onClick={() => handleMethodChange('code')}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${searchMethod === 'code' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            By Code
          </button>
          <button 
            onClick={() => handleMethodChange('id')}
            className={`px-6 py-2 text-sm font-medium rounded-full transition-colors ${searchMethod === 'id' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-white/5'}`}
          >
            By ID
          </button>
        </div>

        <div className="relative w-full mt-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={searchMethod === 'code' ? 'e.g., MIDA-321' : 'e.g., 421077'}
            className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="inline-flex justify-between h-fit gap-2 px-3 py-2 rounded-xl items-center w-full max-w-2xl text-sm text-center text-white/80 bg-white/10 mt-4">
        <pre className="bg-transparent font-mono whitespace-nowrap overflow-x-auto scrollbar-hide w-full text-left">
          {generatedEmbedUrl || 'Generating...'}
        </pre>
        <button 
          onClick={handleCopy}
          className="group relative flex-shrink-0 w-8 h-8 flex items-center justify-center" 
          aria-label="Copy this Link"
        >
          <Check className={`absolute transition-all duration-200 ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
          <Copy className={`absolute transition-all duration-200 ${copied ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} />
        </button>
      </div>

      <div className="w-full max-w-4xl h-80 md:h-[40rem] mt-4">
        <div className="w-full h-full bg-black border rounded-2xl border-white/10 overflow-hidden flex items-center justify-center">
          {isLoading && <p className="text-gray-500">Loading Preview...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {isClient && previewSrc && !isLoading && !error && (
            <iframe
              key={previewSrc}
              allowFullScreen
              className="w-full h-full border-none"
              src={previewSrc}
            ></iframe>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 my-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard icon={<Rocket className="w-5 h-5" />} title="Easy to Use" description="Intuitive and simple. Just enter the JAV ID to generate a link and embed it." colorClasses="bg-indigo-500/10 text-indigo-500" />
          <FeatureCard icon={<Library className="w-5 h-5" />} title="Huge Library" description="Access a massive library of content, updated daily to provide the latest videos." colorClasses="bg-blue-500/10 text-blue-500" />
          <FeatureCard icon={<WandSparkles className="w-5 h-5" />} title="Customizable" description="You can customize the player to your needs using simple query parameters in the URL." colorClasses="bg-pink-500/10 text-pink-500" />
          <FeatureCard icon={<RefreshCw className="w-5 h-5" />} title="Auto Update" description="New content is added every day and is available instantly through our API." colorClasses="bg-purple-500/10 text-purple-500" />
        </div>
      </div>
    </section>
  );
};

export default PlayerTester;
