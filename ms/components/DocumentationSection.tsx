// file: components/DocumentationSection.tsx
"use client";

import { DocsCard } from './DocsCard';

const DocumentationSection = () => {
  return (
    <section id="documentation" className="flex flex-col justify-center w-full max-w-[70rem] gap-4 text-center p-4">
      <div className="flex items-center gap-4 mt-16">
        <h2 className="text-3xl font-semibold text-white/90">API Documentation</h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
      </div>

      <div className="flex flex-col items-start justify-start w-full gap-4 text-left">
        <DocsCard
          title="Embed JAV by Code"
          description="Use the JAV alphanumeric code. This is the most common method."
          urlPath="/embed/code/{jav_code}"
          examplePath="/embed/code/SSNI-123"
        />
        <DocsCard
          title="Embed JAV by ID"
          // UBAH DESKRIPSI DI SINI
          description="Use the numeric ID from the source database for a specific video."
          urlPath="/embed/id/{numeric_id}"
          examplePath="/embed/id/421077"
        />
      </div>
    </section>
  );
};

export default DocumentationSection;
