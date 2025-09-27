// file: components/DocsCard.tsx
"use client";

import { useState, useEffect } from 'react';
import { CodeBlock } from './CodeBlock';

interface DocsCardProps {
  title: string;
  description: string;
  urlPath: string;
  examplePath: string;
}

export const DocsCard = ({ title, description, urlPath, examplePath }: DocsCardProps) => {
  const [domain, setDomain] = useState('');

  useEffect(() => {
    // Deteksi domain hanya di sisi klien
    setDomain(window.location.origin);
  }, []);

  const fullUrl = domain ? `${domain}${urlPath}` : 'Loading...';
  const exampleCode = domain ? `<iframe
  src="${domain}${examplePath}"
  frameborder="0"
  allowfullscreen
></iframe>` : 'Loading...';

  return (
    <div className="flex flex-col w-full p-4 gap-2 transition-all hover:-translate-y-1 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07]">
      <p className="text-xl font-semibold text-white/90">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
      <CodeBlock code={fullUrl} />
      <div className="flex flex-col mt-4">
        <span className="text-xs text-gray-400 mb-1">Code Example:</span>
        <CodeBlock code={exampleCode} className="bg-indigo-500/10 text-indigo-300" />
      </div>
    </div>
  );
};
