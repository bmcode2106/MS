// file: components/CommunitySection.tsx
import Image from 'next/image';
import Link from 'next/link';

const CommunitySection = () => {
  return (
    <footer className="w-full max-w-[70rem] p-4 mx-auto text-center my-16">
      <h2 className="text-3xl font-bold text-white/90">Join the community</h2>
      <p className="mt-2 text-gray-400">
        Get the latest updates, ask questions, and connect with other developers.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        {/* Discord Card */}
        <Link 
          href="https://discord.gg/your-server" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 p-6 w-full sm:w-48 rounded-2xl bg-white/5 border border-white/10 transition-all hover:-translate-y-1 hover:bg-white/[0.07] hover:border-white/20"
        >
          <Image
            src="https://blog.pinwheel.com/hubfs/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
            alt="Discord Logo"
            width={64}
            height={64}
            className="w-16 h-16"
          />
          <div className="text-center">
            <h3 className="font-semibold text-white">Discord</h3>
            <p className="text-xs text-gray-400 mt-1">Join our server</p>
          </div>
        </Link>

        {/* Telegram Card */}
        <Link 
          href="https://t.me/your-channel" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-4 p-6 w-full sm:w-48 rounded-2xl bg-white/5 border border-white/10 transition-all hover:-translate-y-1 hover:bg-white/[0.07] hover:border-white/20"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png"
            alt="Telegram Logo"
            width={64}
            height={64}
            className="w-16 h-16"
          />
          <div className="text-center">
            <h3 className="font-semibold text-white">Telegram</h3>
            <p className="text-xs text-gray-400 mt-1">Join our channel</p>
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default CommunitySection;
