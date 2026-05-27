'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { FadeInImage } from '@/components/ui/FadeInImage'

export type GalleryItem = {
  url: string
  alt: string
  width?: number
  height?: number
  accent?: 'blue' | 'orange'
  label?: string
}

const accentBg: Record<string, string> = {
  blue: 'bg-blue/8',
  orange: 'bg-orange/10',
}

const accentColor: Record<string, string> = {
  blue: '#1A5EAB',
  orange: '#FE9D2B',
}

function StripePattern({ id, color }: { id: string; color: string }) {
  return (
    <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
      <defs>
        <pattern id={id} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke={color} strokeWidth="1.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export function Gallery({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const total = items.length

  const close = useCallback(() => setOpenIndex(null), [])
  const goPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenIndex((cur) => ((cur ?? 0) - 1 + total) % total)
  }, [total])
  const goNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenIndex((cur) => ((cur ?? 0) + 1) % total)
  }, [total])

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') setOpenIndex((cur) => ((cur ?? 0) - 1 + total) % total)
      if (e.key === 'ArrowRight') setOpenIndex((cur) => ((cur ?? 0) + 1) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, total, close])

  const current = openIndex !== null ? items[openIndex] : null

  return (
    <>
      <ul className="columns-1 sm:columns-2 lg:columns-3 gap-4 list-none p-0 m-0">
        {items.map((item, index) => {
          const accent = item.accent ?? 'blue'
          return (
            <li key={index} className="break-inside-avoid mb-4">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="relative w-full overflow-hidden rounded-2xl border border-line cursor-zoom-in transition-shadow duration-150 motion-reduce:transition-none hover:shadow-[0_8px_28px_rgba(40,40,40,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                aria-label={item.label ?? item.alt}
              >
                <div className={`relative w-full overflow-hidden ${accentBg[accent]}`} style={{ aspectRatio: item.width && item.height ? `${item.width}/${item.height}` : '4/3' }}>
                  <FadeInImage
                    src={item.url}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                {item.label && (
                  <div className="px-4 py-2.5 bg-white border-t border-line text-left">
                    <span className="font-mono text-[11px] text-mute">{item.label}</span>
                  </div>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      {openIndex !== null && current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galeria expandida"
          className="fixed inset-0 z-[9999] bg-ink/90 flex items-center justify-center p-6 md:p-10 cursor-zoom-out"
          onClick={close}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar galeria"
              className="absolute -top-12 right-0 bg-transparent border-0 text-white text-3xl font-display cursor-pointer hover:opacity-75 transition-opacity"
            >
              ×
            </button>
            <div className={`relative rounded-[22px] overflow-hidden ${accentBg[current.accent ?? 'blue']}`} style={{ aspectRatio: current.width && current.height ? `${current.width}/${current.height}` : '16/9' }}>
              <StripePattern id="stripe-open" color={accentColor[current.accent ?? 'blue']} />
              <Image
                src={current.url}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain relative z-10"
              />
            </div>
            {current.label && (
              <div className="mt-3 text-center">
                <p className="font-mono text-sm text-white/60 m-0">{current.label}</p>
              </div>
            )}
            <div className="absolute left-[-52px] top-1/2 -translate-y-1/2 hidden md:block">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Item anterior"
                className="h-11 w-11 rounded-full bg-white text-blue text-[26px] font-display border-0 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:opacity-90 transition-opacity"
              >
                ‹
              </button>
            </div>
            <div className="absolute right-[-52px] top-1/2 -translate-y-1/2 hidden md:block">
              <button
                type="button"
                onClick={goNext}
                aria-label="Próximo item"
                className="h-11 w-11 rounded-full bg-white text-blue text-[26px] font-display border-0 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:opacity-90 transition-opacity"
              >
                ›
              </button>
            </div>
            <div className="flex justify-center gap-3 mt-4 md:hidden">
              <button type="button" onClick={goPrev} aria-label="Item anterior" className="h-10 w-10 rounded-full bg-white text-blue text-[22px] font-display border-0 cursor-pointer">‹</button>
              <button type="button" onClick={goNext} aria-label="Próximo item" className="h-10 w-10 rounded-full bg-white text-blue text-[22px] font-display border-0 cursor-pointer">›</button>
            </div>
            <p className="text-center mt-2 font-mono text-xs text-white/40 m-0">
              {(openIndex ?? 0) + 1} / {total}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
