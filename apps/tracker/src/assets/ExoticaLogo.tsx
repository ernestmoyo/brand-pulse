interface ExoticaLogoProps {
  className?: string;
  size?: 'small' | 'default' | 'large';
  variant?: 'full' | 'icon' | 'wordmark';
  color?: 'gold' | 'dark' | 'white';
}

const SIZE_MAP = {
  small: { icon: 28, fontSize: 16, subtitleSize: 8, gap: 8 },
  default: { icon: 40, fontSize: 22, subtitleSize: 10, gap: 10 },
  large: { icon: 56, fontSize: 32, subtitleSize: 14, gap: 14 },
} as const;

const COLOR_MAP = {
  gold: '#D4A853',
  dark: '#2D3E50',
  white: '#FFFFFF',
} as const;

function StarIcon({ size, fill }: { size: number; fill: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 4-point star, elongated top */}
      <path
        d="M32 2L38 24H26L32 2Z"
        fill={fill}
      />
      <path
        d="M32 62L26 40H38L32 62Z"
        fill={fill}
      />
      <path
        d="M2 32L24 26V38L2 32Z"
        fill={fill}
      />
      <path
        d="M62 32L40 38V26L62 32Z"
        fill={fill}
      />
      {/* Diagonal compass points */}
      <path
        d="M12 12L28 24L20 28L12 12Z"
        fill={fill}
        opacity="0.7"
      />
      <path
        d="M52 12L44 28L36 24L52 12Z"
        fill={fill}
        opacity="0.7"
      />
      <path
        d="M12 52L20 36L28 40L12 52Z"
        fill={fill}
        opacity="0.7"
      />
      <path
        d="M52 52L36 40L44 36L52 52Z"
        fill={fill}
        opacity="0.7"
      />
      {/* Center circle */}
      <circle cx="32" cy="32" r="6" fill={fill} />
    </svg>
  );
}

function WordmarkSvg({
  fontSize,
  fill,
}: {
  fontSize: number;
  fill: string;
}) {
  const scale = fontSize / 22;
  const width = Math.round(160 * scale);
  const height = Math.round(28 * scale);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* E */}
      <path
        d="M0 2H18V7H6V11.5H16V16.5H6V21H18V26H0V2Z"
        fill={fill}
      />
      {/* X */}
      <path
        d="M22 2H29L33.5 10.5L38 2H45L37 14L45.5 26H38.5L33.5 17L28.5 26H21.5L30 14L22 2Z"
        fill={fill}
      />
      {/* O */}
      <path
        d="M56 1C63.5 1 69 7 69 14C69 21 63.5 27 56 27C48.5 27 43 21 43 14C43 7 48.5 1 56 1ZM56 6.5C51.8 6.5 49 9.8 49 14C49 18.2 51.8 21.5 56 21.5C60.2 21.5 63 18.2 63 14C63 9.8 60.2 6.5 56 6.5Z"
        fill={fill}
      />
      {/* T */}
      <path
        d="M70 2H90V7H83V26H77V7H70V2Z"
        fill={fill}
      />
      {/* I */}
      <path
        d="M92 2H98V26H92V2Z"
        fill={fill}
      />
      {/* C */}
      <path
        d="M112 1C119.5 1 124 5.5 125 10H119C118.2 8 115.8 6.5 112 6.5C107.8 6.5 105 9.8 105 14C105 18.2 107.8 21.5 112 21.5C115.8 21.5 118.2 20 119 18H125C124 22.5 119.5 27 112 27C104.5 27 99 21 99 14C99 7 104.5 1 112 1Z"
        fill={fill}
      />
      {/* A */}
      <path
        d="M126 26L137 2H143L154 26H148L145.5 20H134.5L132 26H126ZM136.5 15.5H143.5L140 7L136.5 15.5Z"
        fill={fill}
      />
    </svg>
  );
}

function SubtitleSvg({
  subtitleSize,
  fill,
}: {
  subtitleSize: number;
  fill: string;
}) {
  const scale = subtitleSize / 10;
  const width = Math.round(100 * scale);
  const height = Math.round(12 * scale);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 100 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* A */}
      <path
        d="M0 12L5.5 0H8.5L14 12H11L9.8 9H4.2L3 12H0ZM5 7H9L7 2L5 7Z"
        fill={fill}
        opacity="0.6"
      />
      {/* G */}
      <path
        d="M20 0C24 0 27 2.5 27 6C27 9.5 24 12 20 12C16 12 13 9.5 13 6C13 2.5 16 0 20 0ZM20 2.5C17.5 2.5 16 4 16 6C16 8 17.5 9.5 20 9.5C22 9.5 23.2 8.5 23.8 7H20V5H27V6C27 9.5 24 12 20 12C16 12 13 9.5 13 6C13 2.5 16 0 20 0Z"
        fill={fill}
        opacity="0.6"
      />
      {/* E */}
      <path
        d="M30 0H40V2.5H33V4.5H39V7H33V9.5H40V12H30V0Z"
        fill={fill}
        opacity="0.6"
      />
      {/* N */}
      <path
        d="M43 0H46L52 8V0H55V12H52L46 4V12H43V0Z"
        fill={fill}
        opacity="0.6"
      />
      {/* C */}
      <path
        d="M63 0C67 0 69 2 69.5 4.5H66.5C66 3.2 64.8 2.5 63 2.5C60.5 2.5 59 4 59 6C59 8 60.5 9.5 63 9.5C64.8 9.5 66 8.8 66.5 7.5H69.5C69 10 67 12 63 12C59 12 56 9.5 56 6C56 2.5 59 0 63 0Z"
        fill={fill}
        opacity="0.6"
      />
      {/* Y */}
      <path
        d="M72 0H75L78.5 5L82 0H85L80 7V12H77V7L72 0Z"
        fill={fill}
        opacity="0.6"
      />
    </svg>
  );
}

export default function ExoticaLogo({
  className = '',
  size = 'default',
  variant = 'full',
  color = 'dark',
}: ExoticaLogoProps) {
  const dimensions = SIZE_MAP[size];
  const fill = COLOR_MAP[color];

  if (variant === 'icon') {
    return (
      <div className={className}>
        <StarIcon size={dimensions.icon} fill={fill} />
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={`flex flex-col ${className}`}>
        <WordmarkSvg fontSize={dimensions.fontSize} fill={fill} />
        <SubtitleSvg subtitleSize={dimensions.subtitleSize} fill={fill} />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center ${className}`}
      style={{ gap: dimensions.gap }}
    >
      <StarIcon size={dimensions.icon} fill={fill} />
      <div className="flex flex-col">
        <WordmarkSvg fontSize={dimensions.fontSize} fill={fill} />
        <div style={{ marginTop: 2 }}>
          <SubtitleSvg subtitleSize={dimensions.subtitleSize} fill={fill} />
        </div>
      </div>
    </div>
  );
}
