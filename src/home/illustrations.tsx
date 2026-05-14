import React from 'react'

export function Sparkle({
  size = 56,
  color = '#080717',
  className = '',
  style,
}: {
  size?: number
  color?: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 56 56"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g stroke={color} strokeWidth="2" strokeLinecap="round" fill="none">
        <line x1="28" y1="4" x2="28" y2="20" />
        <line x1="28" y1="36" x2="28" y2="52" />
        <line x1="4" y1="28" x2="20" y2="28" />
        <line x1="36" y1="28" x2="52" y2="28" />
        <line x1="10" y1="10" x2="22" y2="22" />
        <line x1="34" y1="34" x2="46" y2="46" />
        <line x1="46" y1="10" x2="34" y2="22" />
        <line x1="22" y1="34" x2="10" y2="46" />
      </g>
    </svg>
  )
}

export function ArrowCurve({
  size = 120,
  color = '#FE9D2B',
  className = '',
  style,
}: {
  size?: number
  color?: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      style={style}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 20 C 80 10, 110 60, 60 95"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <polygon points="55,80 60,100 75,85" fill={color} />
    </svg>
  )
}

export function DotGrid({
  cols = 8,
  rows = 4,
  gap = 18,
  color = '#1A5EAB',
  opacity = 0.35,
  className = '',
  style,
}: {
  cols?: number
  rows?: number
  gap?: number
  color?: string
  opacity?: number
  className?: string
  style?: React.CSSProperties
}) {
  const dots: React.ReactNode[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        <circle key={`${r}-${c}`} cx={c * gap + 4} cy={r * gap + 4} r="2" fill={color} />,
      )
    }
  }
  return (
    <svg
      width={cols * gap}
      height={rows * gap}
      className={className}
      style={{ opacity, ...style }}
      aria-hidden="true"
    >
      {dots}
    </svg>
  )
}

export function OrangeBlob({
  size = 280,
  className = '',
  style,
}: {
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 280 280"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <circle cx="140" cy="140" r="120" fill="#FE9D2B" />
      <path
        d="M50 120 C 90 80, 160 80, 220 120"
        stroke="#fff"
        strokeWidth="2"
        fill="none"
        opacity=".6"
      />
    </svg>
  )
}

export function TagMark({
  size = 200,
  className = '',
  style,
}: {
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <rect x="30" y="50" width="130" height="110" rx="18" fill="#1A5EAB" />
      <path
        d="M70 108 l22 22 l40 -46"
        stroke="#fff"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="110"
        y="20"
        width="60"
        height="60"
        rx="12"
        fill="#FE9D2B"
        transform="rotate(12 140 50)"
      />
    </svg>
  )
}

export function ChatMark({
  size = 140,
  className = '',
  style,
}: {
  size?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      viewBox="0 0 140 140"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path
        d="M18 22 h70 a16 16 0 0 1 16 16 v38 a16 16 0 0 1 -16 16 h-32 l-20 18 v-18 h-18 a16 16 0 0 1 -16 -16 v-38 a16 16 0 0 1 16 -16 z"
        fill="#1A5EAB"
      />
      <path
        d="M60 56 h52 a14 14 0 0 1 14 14 v30 a14 14 0 0 1 -14 14 h-20 v14 l-16 -14 h-16 a14 14 0 0 1 -14 -14 v-30 a14 14 0 0 1 14 -14 z"
        fill="#FE9D2B"
      />
    </svg>
  )
}

type GlyphKind =
  | 'circle'
  | 'triangle'
  | 'square'
  | 'diamond'
  | 'arc'
  | 'plus'
  | 'hexagon'
  | 'rings'
  | 'halfcircle'
  | 'wave'
  | 'chevron'
  | 'bars'

export function Glyph({ kind, size = 22, className = '' }: { kind: GlyphKind; size?: number; className?: string }) {
  const stroke = 'currentColor'
  const sw = 1.6
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none' as const,
    stroke,
    strokeWidth: sw,
    className,
    'aria-hidden': true as const,
  }
  switch (kind) {
    case 'circle':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      )
    case 'triangle':
      return (
        <svg {...props} strokeLinejoin="round">
          <path d="M12 4 L21 20 L3 20 Z" />
        </svg>
      )
    case 'square':
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="1" />
        </svg>
      )
    case 'diamond':
      return (
        <svg {...props} strokeLinejoin="round">
          <path d="M12 3 L21 12 L12 21 L3 12 Z" />
        </svg>
      )
    case 'arc':
      return (
        <svg {...props} strokeLinecap="round">
          <path d="M4 18 A8 8 0 0 1 20 18" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...props} strokeLinecap="round">
          <path d="M12 4 V20 M4 12 H20" />
        </svg>
      )
    case 'hexagon':
      return (
        <svg {...props} strokeLinejoin="round">
          <path d="M12 3 L20 7.5 L20 16.5 L12 21 L4 16.5 L4 7.5 Z" />
        </svg>
      )
    case 'rings':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      )
    case 'halfcircle':
      return (
        <svg {...props} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 4 V20 A8 8 0 0 0 8 4 Z" />
        </svg>
      )
    case 'wave':
      return (
        <svg {...props} strokeLinecap="round">
          <path d="M3 14 Q 7.5 6, 12 14 T 21 14" />
        </svg>
      )
    case 'chevron':
      return (
        <svg {...props} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 17 L12 7 L20 17" />
        </svg>
      )
    case 'bars':
      return (
        <svg {...props} strokeLinecap="round">
          <path d="M7 4 V20 M12 4 V20 M17 4 V20" />
        </svg>
      )
    default:
      return null
  }
}

export const GLYPH_OPTIONS = [
  'circle',
  'triangle',
  'square',
  'diamond',
  'arc',
  'plus',
  'hexagon',
  'rings',
  'halfcircle',
  'wave',
  'chevron',
  'bars',
] as const
