import React from 'react'
import type { PullQuoteBlock } from '@/payload-types'
import { Sparkle } from '@/home/illustrations'

function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

export const PullQuoteComponent: React.FC<PullQuoteBlock> = ({ eyebrow, quote, author, role }) => {
  return (
    <section className="bg-white border-y border-line px-12 py-22">
      <div className="max-w-3xl mx-auto text-center relative">
        <Sparkle size={32} color="#1A5EAB" className="absolute top-0 left-0 opacity-25" />
        <Sparkle size={24} color="#FE9D2B" className="absolute bottom-0 right-0 opacity-25" />
        {eyebrow && <p className="font-eyebrow m-0 mb-7">{eyebrow}</p>}
        <p className="m-0 max-w-3xl mx-auto font-display font-light text-[28px] leading-snug text-ink tracking-tight">
          &ldquo;{quote}&rdquo;
        </p>
        {(author || role) && (
          <div className="mt-8 flex items-center justify-center gap-3.5">
            {author && (
              <span
                aria-label={author}
                className="inline-flex h-12 w-12 rounded-full bg-paper-dim items-center justify-center font-display font-bold text-mute"
              >
                {initials(author)}
              </span>
            )}
            <div className="text-left">
              {author && (
                <div className="font-display font-bold text-[15px] text-ink">{author}</div>
              )}
              {role && <div className="text-[13px] text-mute">{role}</div>}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
