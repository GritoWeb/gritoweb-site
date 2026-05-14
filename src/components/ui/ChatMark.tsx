import React from 'react'

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
