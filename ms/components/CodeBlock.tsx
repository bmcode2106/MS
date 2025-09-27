// file: components/CodeBlock.tsx
"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  className?: string;
}

export const CodeBlock = ({ code, className = '' }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`inline-flex justify-between items-center h-fit gap-2 px-3 py-1.5 rounded-xl w-full text-sm bg-black/20 ${className}`}>
      <pre className="bg-transparent font-mono whitespace-pre-wrap overflow-x-auto scrollbar-hide w-full text-left">
        {code}
      </pre>
      <button 
        onClick={handleCopy}
        className="group relative flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors" 
        aria-label="Copy to clipboard"
      >
        <Check size={18} className={`absolute text-green-400 transition-all duration-200 ${copied ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
        <Copy size={18} className={`absolute text-gray-400 transition-all duration-200 ${copied ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} />
      </button>
    </div>
  );
};
