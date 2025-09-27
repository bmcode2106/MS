// file: components/StatCard.tsx

interface StatCardProps {
  count: string;
  category: string;
}

export const StatCard = ({ count, category }: StatCardProps) => {
  return (
    <div className="p-4 gap-2 transition-all hover:-translate-y-1 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] flex flex-col items-center w-28">
      <span className="text-2xl font-bold text-gray-300">{count}</span>
      <span className="text-xs text-gray-400">{category}</span>
    </div>
  );
};
