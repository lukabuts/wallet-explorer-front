import type { JazzAvatarProps } from "./types";

function jazzColors(addr: string) {
  const palette = [
    "#f58220",
    "#4ade80",
    "#60a5fa",
    "#f472b6",
    "#a78bfa",
    "#34d399",
    "#fb923c",
    "#38bdf8",
    "#e879f9",
  ];
  const h = addr.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return [
    palette[h % palette.length],
    palette[(h * 7) % palette.length],
    palette[(h * 13) % palette.length],
  ];
}

export function JazzAvatar({ address, size = 36 }: JazzAvatarProps) {
  const [c1, c2, c3] = jazzColors(address);
  const h = address.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={{ borderRadius: "50%", flexShrink: 0 }}
    >
      <rect width="40" height="40" fill="#1a1a1a" />
      <circle
        cx={10 + (h % 12)}
        cy={10 + (h % 10)}
        r={8 + (h % 6)}
        fill={c1}
        opacity="0.85"
      />
      <circle
        cx={20 + (h % 8)}
        cy={20 + (h % 12)}
        r={7 + (h % 5)}
        fill={c2}
        opacity="0.75"
      />
      <circle
        cx={15 + (h % 6)}
        cy={25 + (h % 8)}
        r={6 + (h % 4)}
        fill={c3}
        opacity="0.65"
      />
    </svg>
  );
}
