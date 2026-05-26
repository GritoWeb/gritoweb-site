import React from 'react'
import { ArrowIcon } from '@/components/ui/ArrowIcon'

// ── ProjectCard ───────────────────────────────────────────────────────────────

const accentBg: Record<string, string> = {
  blue: 'bg-blue/8',
  orange: 'bg-orange/10',
}

const tagVariantClasses: Record<string, string> = {
  blue: 'bg-blue/10 text-blue',
  orange: 'bg-orange/15 text-orange-700',
}

type ProjectCardProps = {
  tag?: string | null
  tagVariant?: 'blue' | 'orange'
  accent?: 'blue' | 'orange'
  client?: string | null
  year?: string | null
  title: string
  result?: string | null
  motif?: React.ReactNode
  href: string
}

export function ProjectCard({
  tag,
  tagVariant = 'blue',
  accent = 'blue',
  client,
  year,
  title,
  result,
  motif,
  href,
}: ProjectCardProps) {
  return (
    <a
      href={href}
      className="flex flex-col rounded-3xl overflow-hidden bg-white border border-line no-underline text-inherit transition-shadow duration-150 hover:shadow-[0_8px_28px_rgba(40,40,40,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <div className={`relative h-[180px] flex items-center justify-center overflow-hidden ${accentBg[accent]}`}>
        {year && (
          <span className="absolute top-4 right-4 font-body text-xs text-mute">{year}</span>
        )}
        {motif ?? (
          <span className="font-display font-black text-5xl opacity-10 select-none">
            {title.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-6 gap-3">
        {tag && (
          <span className={`self-start inline-flex items-center px-3 py-1.5 rounded-full font-body text-xs font-bold uppercase tracking-[0.04em] ${tagVariantClasses[tagVariant]}`}>
            {tag}
          </span>
        )}
        {client && (
          <p className="m-0 font-display font-bold text-[11px] uppercase tracking-[0.14em] text-orange">
            {client}
          </p>
        )}
        <h3 className="m-0 font-display font-bold text-lg text-ink leading-snug">{title}</h3>
        {result && (
          <p className="m-0 font-body text-sm font-medium text-blue mt-auto">{result}</p>
        )}
      </div>
    </a>
  )
}

// ── ServiceCard ───────────────────────────────────────────────────────────────

type ServiceCardProps = {
  variant?: 'blue' | 'orange'
  icon?: React.ReactNode
  title: string
  description?: string | null
  bullets?: string[]
  ctaLabel?: string
  href?: string
}

export function ServiceCard({
  variant = 'blue',
  icon,
  title,
  description,
  bullets,
  ctaLabel,
  href,
}: ServiceCardProps) {
  const iconBg = variant === 'orange' ? 'bg-orange/10 text-orange' : 'bg-blue/10 text-blue'
  const ctaColor = variant === 'orange' ? 'text-orange' : 'text-blue'

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-7 justify-center">
      {icon && (
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
      )}
      <h3 className="m-0 font-display font-bold text-lg text-ink leading-snug">{title}</h3>
      {description && (
        <p className="m-0 font-body text-sm text-mute leading-relaxed">{description}</p>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 font-body text-sm text-ink">
              <span className={`mt-0.5 font-bold ${ctaColor}`}>—</span>
              {b}
            </li>
          ))}
        </ul>
      )}
      {ctaLabel && href && (
        <a
          href={href}
          className={`group inline-flex items-center gap-1.5 font-display font-medium text-sm no-underline ${ctaColor}`}
        >
          {ctaLabel}
          <ArrowIcon
            size={14}
            className="transition-transform duration-150 ease-out group-hover:translate-x-1 motion-reduce:transform-none"
          />
        </a>
      )}
    </div>
  )
}

// ── LogoMark ──────────────────────────────────────────────────────────────────

type LogoMarkProps = {
  name?: string
  icon?: React.ReactNode
}

export function LogoMark({ name, icon }: LogoMarkProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-14 h-14  bg-white flex items-center justify-center text-ink">
        {icon}
      </div>
      {name && <span className="font-body text-xs text-mute text-center">{name}</span>}
    </div>
  )
}
