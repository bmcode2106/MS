// file: app/(embed)/embed/layout.tsx

// Layout ini SANGAT BERSIH. Tidak ada apa pun selain children.
export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
