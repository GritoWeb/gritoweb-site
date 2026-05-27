import React from 'react'

// ── Orange span ────────────────────────────────────────────

export function Orange({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={['text-orange', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </span>
  )
}

// ── Button ─────────────────────────────────────────────────

const buttonVariant: Record<string, string> = {
  primary: 'bg-orange text-white',
  blue: 'bg-blue text-white',
  ghost:
    'bg-transparent text-ink-soft border-[1.5px] border-line hover:border-blue hover:text-blue',
  white: 'bg-white text-orange',
}

const buttonSize: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
}

const buttonBase = [
  'group inline-flex items-center justify-center gap-2',
  'rounded-full font-display font-bold no-underline',
  'transition-opacity duration-150 cursor-pointer',
  'motion-reduce:transition-none',
  'hover:opacity-90',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
].join(' ')

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'blue' | 'ghost' | 'white'
  size?: 'sm' | 'md'
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  href,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonProps) {
  const classes = [
    buttonBase,
    buttonVariant[variant],
    buttonSize[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const iconEl = icon ? (
    <span className={
      iconPosition === 'right'
        ? 'transition-transform duration-150 ease-out group-hover:translate-x-1 motion-reduce:transform-none'
        : 'transition-transform duration-150 ease-out group-hover:-translate-x-1 motion-reduce:transform-none'
    }>
      {icon}
    </span>
  ) : null

  const inner = (
    <>
      {iconEl && iconPosition === 'left' && iconEl}
      {children}
      {iconEl && iconPosition === 'right' && iconEl}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={[classes, disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '']
          .filter(Boolean)
          .join(' ')}
        aria-disabled={disabled || undefined}
      >
        {inner}
      </a>
    )
  }

  return (
    <button type={type} disabled={disabled} className={classes}>
      {inner}
    </button>
  )
}

// ── Tag ────────────────────────────────────────────────────

const tagVariant: Record<string, string> = {
  default: 'bg-paper-dim text-ink-soft',
  blue: 'bg-blue/10 text-blue',
  orange: 'bg-orange/15 text-orange-700',
}

const tagBase =
  'inline-flex items-center px-3 py-1.5 rounded-full  text-xs font-bold uppercase tracking-[0.04em]'

export function Tag({
  children,
  variant = 'default',
  className = '',
  ...props
}: { children: React.ReactNode; variant?: 'default' | 'blue' | 'orange'; className?: string } & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={[tagBase, tagVariant[variant], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}

// ── Avatar ─────────────────────────────────────────────────

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

// ── IconBadge ──────────────────────────────────────────────

const iconBadgeVariant: Record<string, string> = {
  blue: 'bg-blue text-white',
  orange: 'bg-orange text-white',
  'soft-blue': 'bg-blue/10 text-blue',
  'soft-orange': 'bg-orange/10 text-orange',
  paper: 'bg-paper-dim text-ink-soft',
}

const iconBadgeSize: Record<string, string> = {
  sm: 'h-10 w-10 rounded-xl',
  md: 'h-12 w-12 rounded-2xl',
  lg: 'h-14 w-14 rounded-2xl',
}

const iconBadgeBase = 'inline-flex items-center justify-center shrink-0'

export function IconBadge({
  children,
  variant = 'blue',
  size = 'md',
  className = '',
  ...props
}: {
  children: React.ReactNode
  variant?: 'blue' | 'orange' | 'soft-blue' | 'soft-orange' | 'paper'
  size?: 'sm' | 'md' | 'lg'
  className?: string
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={[iconBadgeBase, iconBadgeVariant[variant], iconBadgeSize[size], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}

// ── StepBullet ─────────────────────────────────────────────

const stepBulletBase =
  'inline-flex items-center justify-center h-14 w-14 rounded-full font-display text-xl'

const stepBulletVariant: Record<string, string> = {
  blue: 'bg-blue text-white',
  orange: 'bg-orange text-white',
}

export function StepBullet({
  children,
  variant = 'blue',
  className = '',
  ...props
}: {
  children: React.ReactNode
  variant?: 'blue' | 'orange'
  className?: string
} & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={[stepBulletBase, stepBulletVariant[variant], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}
