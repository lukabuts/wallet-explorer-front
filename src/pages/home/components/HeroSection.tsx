export function HeroSection() {
  return (
    <div className="text-center px-6 pt-16 pb-12">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/8 text-orange-400 text-[11px] font-bold tracking-widest uppercase mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
        Ethereum Explorer
      </div>
      <h1 className="text-[42px] md:text-[52px] font-extrabold text-gray-100 leading-[1.1] tracking-[-2px] mb-4">
        Explore the
        <br />
        <span className="text-orange-400">Ethereum</span> Network
      </h1>
      <p className="text-gray-500 text-[15px] max-w-md mx-auto leading-relaxed">
        Search any wallet address, track on-chain activity, and connect your
        MetaMask to view your accounts in real time.
      </p>
    </div>
  );
}
