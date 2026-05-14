import React from 'react'

interface LogoProps {
  size?: number
  className?: string
}

export function Logo({ size = 44, className = '', ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      role="img"
      aria-label="GritoWeb"
      className={className}
      {...props}
    >
      <path
        d="M14 24 h60 a14 14 0 0 1 14 14 v24 a14 14 0 0 1 -14 14 h-26 l-16 14 v-14 h-18 a14 14 0 0 1 -14 -14 v-24 a14 14 0 0 1 14 -14 z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        d="M50 56 h42 a14 14 0 0 1 14 14 v22 a14 14 0 0 1 -14 14 h-10 v10 l-12 -10 h-20 a14 14 0 0 1 -14 -14 v-22 a14 14 0 0 1 14 -14 z"
        fill="none"
        stroke="#FE9D2B"
        strokeWidth="4"
      />
    </svg>
  )
}

const themeClasses = {
  light: { logo: 'text-blue', word1: 'text-orange', word2: 'text-blue' },
  dark: { logo: 'text-white', word1: 'text-white', word2: 'text-orange' },
}

interface LogoWordProps {
  size?: number
  theme?: 'light' | 'dark'
  stacked?: boolean
  className?: string
}

export function LogoWord({ size = 44, theme = 'light', stacked = false, className = '' }: LogoWordProps) {
  const colors = themeClasses[theme]
  const root = ['inline-flex items-center gap-2.5', className].filter(Boolean).join(' ')
  const wordmark = stacked
    ? 'flex flex-col font-display font-bold text-xl leading-none tracking-tight'
    : 'flex items-baseline font-display font-bold text-xl leading-none tracking-tight'

  return (
    <div className={root}>
      <Logo size={size} className={colors.logo} />
      <div className={wordmark}>
        <span className={colors.word1}>grito</span>
        <span className={`${colors.word2}${stacked ? ' mt-0.5' : ''}`}>weB</span>
      </div>
    </div>
  )
}
