import React from 'react'

const testimonialSurface: Record<string, string> = {
  paper: 'bg-white',
  card: 'bg-card',
}

export function TestimonialCard({
  quote,
  author,
  role,
  surface = 'paper',
  className = '',
}: {
  quote: string
  author: string
  role?: string
  surface?: 'paper' | 'card'
  avatarVariant?: 'blue' | 'orange'
  className?: string
}) {
  const root = [
    'relative border border-line rounded-3xl p-7',
    testimonialSurface[surface],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <figure className={root}>
      <span
        aria-hidden="true"
        className="absolute top-4.5 right-5.5 font-display font-black text-orange/50 leading-[0.7] text-6xl"
      >
        &rdquo;
      </span>
      <blockquote className="m-0">
        <p className="m-0 font-display font-light text-lg text-ink leading-snug">{quote}</p>
      </blockquote>
      <figcaption className="mt-4.5 pt-4 border-t border-dashed border-line flex items-center gap-3.5">
        <div>
          <div className="font-display font-bold text-[15px]">{author}</div>
          {role && <div className="text-mute text-xs">{role}</div>}
        </div>
      </figcaption>
    </figure>
  )
}
