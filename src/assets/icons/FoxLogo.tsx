export function FoxLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <polygon
        points="16,2 28,8 28,20 16,30 4,20 4,8"
        fill="rgba(245,130,32,0.12)"
        stroke="#f58220"
        strokeWidth="1"
      />
      <polygon
        points="16,7 24,11 20,22 16,25 12,22 8,11"
        fill="rgba(245,130,32,0.22)"
      />
      <circle cx="13" cy="14" r="1.5" fill="#f58220" />
      <circle cx="19" cy="14" r="1.5" fill="#f58220" />
      <polygon points="16,17 14,19 18,19" fill="#f58220" opacity="0.75" />
    </svg>
  );
}
