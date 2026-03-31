export default function BrandPulseLogo({ className = '', size = 'default' }: { className?: string; size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: { width: 160, height: 36 },
    default: { width: 220, height: 48 },
    large: { width: 330, height: 72 },
  };
  const { width, height } = sizes[size];

  return (
    <svg className={className} width={width} height={height} viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* ECG Pulse Line */}
      <path d="M 4 24 L 10 24 L 13 16 L 17 32 L 21 10 L 25 28 L 29 18 L 33 24 L 40 24" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      <path d="M 4 24 L 10 24 L 13 16 L 17 32 L 21 10 L 25 28 L 29 18 L 33 24 L 40 24" stroke="#00D4FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" strokeDasharray="2 3" strokeDashoffset="1"/>
      {/* BRAND text - serif, elegant */}
      <text x="48" y="22" fontFamily="'Playfair Display', 'DM Serif Display', Georgia, serif" fontSize="19" fontWeight="600" fill="#FFFFFF" dominantBaseline="middle" letterSpacing="1">BRAND</text>
      {/* PULSE text - mono, lighter weight, cyan accent */}
      <text x="120" y="22" fontFamily="'JetBrains Mono', monospace" fontSize="19" fontWeight="300" fill="#00D4FF" dominantBaseline="middle" letterSpacing="0.5">PULSE</text>
      {/* Subtle pulse dot */}
      <circle cx="42" cy="24" r="2" fill="#00D4FF" opacity="0.5">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
      </circle>
      {/* Tagline */}
      <text x="48" y="40" fontFamily="'DM Sans', sans-serif" fontSize="7" fill="#64748B" letterSpacing="2">BRAND HEALTH INTELLIGENCE</text>
    </svg>
  );
}
