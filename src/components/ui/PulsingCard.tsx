export function PulsingCard({ count = 10 }: { count?: number }) {
  return (
    <div className="animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="h-11 bg-white/5 border border-white/8 rounded-xl mb-2 last:mb-0 mr-3"
        />
      ))}
    </div>
  );
}
