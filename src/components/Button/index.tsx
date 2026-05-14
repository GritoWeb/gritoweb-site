import Link from 'next/link'
import React from 'react'

type Variant = 'primary' | 'blue' | 'ghost' | 'white'
type Size = 'sm' | 'md'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-orange text-white',
  blue: 'bg-blue text-white',
  ghost: 'bg-transparent text-ink-soft border-[1.5px] border-line hover:border-blue hover:text-blue',
  white: 'bg-white text-orange',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
}

const baseClasses = [
  'inline-flex items-center justify-center gap-2',
  'rounded-full font-display font-medium no-underline',
  'transition-opacity duration-150 cursor-pointer',
  'motion-reduce:transition-none',
  'hover:opacity-90',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
].join(' ')

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  href?: string
  disabled?: boolean
  className?: string
  children?: React.ReactNode
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
  ...props
}: ButtonProps) {
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </>
  )

  if (href) {
    return (
      <Link
        href={disabled ? '#' : href}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        className={disabled ? `${classes} opacity-50 cursor-not-allowed pointer-events-none` : classes}
      >
        {inner}
      </Link>
    )
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {inner}
    </button>
  )
}
