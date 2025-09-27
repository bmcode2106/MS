// file: components/FeatureCard.tsx

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClasses: string; // e.g., "bg-indigo-500/10 text-indigo-500"
}

export const FeatureCard = ({ icon, title, description, colorClasses }: FeatureCardProps) => {
  return (
    <div className="p-4 space-y-3 transition-all hover:-translate-y-1 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/[0.07]">
      <div className={`p-1.5 w-fit rounded-lg ${colorClasses.split(' ')[0]}`}>
        {icon}
      </div>
      <p className="text-lg font-medium text-white/90">{title}</p>
      <p className="text-sm text-gray-400">
        {description}
      </p>
    </div>
  );
};
