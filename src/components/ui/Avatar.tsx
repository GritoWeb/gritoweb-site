import React from 'react'

const avatarVariant: Record<string, string> = {
  blue: 'bg-blue text-white',
  orange: 'bg-orange text-white',
  paper: 'bg-paper-dim text-mute',
}

const avatarSize: Record<string, string> = {
  sm: 'h-9 w-9 text-sm',
  md: 'h-11 w-11 text-base',
  lg: 'h-12 w-12 text-lg',
}

const avatarBase =
  'inline-flex items-center justify-center rounded-full font-display font-black shrink-0'

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Avatar({
  name,
  initials,
  variant = 'blue',
  size = 'md',
  className = '',
  ...props
}: {
  name?: string
  initials?: string
  variant?: 'blue' | 'orange' | 'paper'
  size?: 'sm' | 'md' | 'lg'
  className?: string
} & React.HTMLAttributes<HTMLSpanElement>) {
  const display = initials ?? (name ? getInitials(name) : '')
  return (
    <span
      className={[avatarBase, avatarVariant[variant], avatarSize[size], className]
        .filter(Boolean)
        .join(' ')}
      aria-label={name ?? undefined}
      {...props}
    >
      {display}
    </span>
  )
}
