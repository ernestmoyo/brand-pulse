export default function BrandPulseLogo({ className = '', size = 'default' }: { className?: string; size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: { height: 28, logoH: 20, gap: 8 },
    default: { height: 40, logoH: 28, gap: 12 },
    large: { height: 56, logoH: 40, gap: 16 },
  };
  const s = sizes[size];

  return (
    <div className={`flex items-center ${className}`} style={{ height: s.height }}>
      {/* Nestle Logo */}
      <img
        src="/nestle-logo.svg"
        alt="Nestlé"
        style={{ height: s.logoH, filter: 'brightness(0) invert(1)' }}
      />
      {/* Divider */}
      <div style={{ width: 1, height: s.height * 0.6, background: 'rgba(255,255,255,0.2)', margin: `0 ${s.gap}px` }} />
      {/* Brand Pulse text */}
      <div className="flex flex-col justify-center leading-none">
        <span style={{ fontFamily: "'Playfair Display', 'DM Serif Display', serif", fontSize: s.height * 0.4, fontWeight: 600, color: '#FFFFFF', letterSpacing: 1 }}>
          BRAND <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 300, color: '#00D4FF' }}>PULSE</span>
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: s.height * 0.16, color: '#64748B', letterSpacing: 2, marginTop: 2 }}>
          BRAND HEALTH INTELLIGENCE
        </span>
      </div>
    </div>
  );
}
