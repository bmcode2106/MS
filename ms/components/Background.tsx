// file: components/Background.tsx

export const Background = () => {
  return (
    <div className="fixed left-0 top-0 -z-10 h-full w-full">
      <div className="relative h-full w-full bg-black">
        <div className="absolute h-full w-full bg-[radial-gradient(#2e2e2e_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
    </div>
  );
};
