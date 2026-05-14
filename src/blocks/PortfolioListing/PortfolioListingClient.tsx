'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { parseTitle } from '@/utilities/parseTitle'

// ── Types ─────────────────────────────────────────────────────────────────────

export type PortfolioItem = {
  id: string
  title: string
  slug: string
  client?: string | null
  result?: string | null
  year?: string | null
  tagId?: string | null
  tagLabel?: string | null
  tagVariant?: 'blue' | 'orange'
  accent?: 'blue' | 'orange'
  image?: Media | null
}

export type FilterOption = {
  label: string
  value: string
}

export type PortfolioListingClientProps = {
  portfolios: PortfolioItem[]
  filters: FilterOption[]
  eyebrow?: string | null
  title?: string | null
  showFilters: boolean
  showViewToggle: boolean
}

// ── Icons ─────────────────────────────────────────────────────────────────────

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
)

// ── Primitives ────────────────────────────────────────────────────────────────

const accentBg: Record<string, string> = {
  blue: 'bg-blue/8',
  orange: 'bg-orange/10',
}

const tagVariantClasses: Record<string, string> = {
  blue: 'bg-blue/10 text-blue',
  orange: 'bg-orange/15 text-orange-700',
}

function Tag({ children, variant = 'blue' }: { children: React.ReactNode; variant?: 'blue' | 'orange' }) {
  return (
    <span className={`inline-flex items-center px-3 py-1.5 rounded-full font-body text-xs font-bold uppercase tracking-[0.04em] ${tagVariantClasses[variant]}`}>
      {children}
    </span>
  )
}

// ── Card components ───────────────────────────────────────────────────────────

function PortfolioCardGrid({ item }: { item: PortfolioItem }) {
  const imageUrl = item.image?.url ?? null
  const bg = accentBg[item.accent ?? 'blue']

  return (
    <a
      href={`/portfolio/${item.slug}`}
      className="flex flex-col rounded-3xl overflow-hidden bg-white border border-line no-underline text-inherit transition-shadow duration-150 motion-reduce:transition-none hover:shadow-[0_8px_28px_rgba(8,7,23,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <div className={`relative h-[200px] flex items-center justify-center overflow-hidden ${bg}`}>
        {item.year && (
          <span className="absolute top-4 right-4 font-body text-xs text-mute">{item.year}</span>
        )}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.image?.alt ?? item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <span className="font-display font-black text-5xl opacity-10 select-none">
            {item.title.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-6 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {item.tagLabel && <Tag variant={item.tagVariant ?? 'blue'}>{item.tagLabel}</Tag>}
        </div>
        {item.client && (
          <p className="m-0 font-display font-bold text-[11px] uppercase tracking-[0.14em] text-orange">
            {item.client}
          </p>
        )}
        <h3 className="m-0 font-display font-bold text-lg text-ink leading-snug">{item.title}</h3>
        {item.result && (
          <p className="m-0 font-body text-sm font-medium text-blue mt-auto">{item.result}</p>
        )}
      </div>
      <div className="px-6 pb-5 flex justify-end">
        <span className="inline-flex items-center gap-1.5 font-display text-sm font-medium text-mute">
          <ArrowRight />
        </span>
      </div>
    </a>
  )
}

function PortfolioCardList({ item }: { item: PortfolioItem }) {
  return (
    <a
      href={`/portfolio/${item.slug}`}
      className="flex items-center gap-6 rounded-2xl bg-white border border-line p-5 no-underline text-inherit transition-shadow duration-150 motion-reduce:transition-none hover:shadow-[0_4px_16px_rgba(8,7,23,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <div className={`shrink-0 w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden relative ${accentBg[item.accent ?? 'blue']}`}>
        {item.image?.url ? (
          <Image
            src={item.image.url}
            alt={item.image.alt ?? item.title}
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <span className="font-display font-black text-xl opacity-20 select-none">
            {item.title.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          {item.tagLabel && <Tag variant={item.tagVariant ?? 'blue'}>{item.tagLabel}</Tag>}
          {item.year && <span className="font-body text-xs text-mute">{item.year}</span>}
        </div>
        {item.client && (
          <p className="m-0 font-display font-bold text-[11px] uppercase tracking-[0.14em] text-orange mb-0.5">
            {item.client}
          </p>
        )}
        <h3 className="m-0 font-display font-bold text-base text-ink leading-snug">{item.title}</h3>
        {item.result && (
          <p className="m-0 mt-1 font-body text-sm font-medium text-blue">{item.result}</p>
        )}
      </div>
      <ArrowRight />
    </a>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export const PortfolioListingClient: React.FC<PortfolioListingClientProps> = ({
  portfolios,
  filters,
  eyebrow,
  title,
  showFilters,
  showViewToggle,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return portfolios
    return portfolios.filter((p) => p.tagId === activeFilter)
  }, [portfolios, activeFilter])

  return (
    <section className="px-6 md:px-12 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          {eyebrow && <p className="font-eyebrow m-0 mb-3">{eyebrow}</p>}
          {title && (
            <h2 className="m-0 font-display font-bold text-h2 text-ink leading-tight">
              {parseTitle(title)}
            </h2>
          )}
        </div>

        {/* Controls bar */}
        {(showFilters || showViewToggle) && (
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            {/* Filter pills */}
            {showFilters && (
              <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Filtrar por categoria">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={[
                    'px-4 py-2 rounded-full font-display font-medium text-sm cursor-pointer border-[1.5px] transition-colors duration-150 motion-reduce:transition-none',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
                    activeFilter === 'all'
                      ? 'bg-orange text-white border-orange'
                      : 'bg-transparent text-ink border-line hover:border-blue hover:text-blue',
                  ].join(' ')}
                  aria-pressed={activeFilter === 'all'}
                >
                  Todos
                </button>
                {filters.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={[
                      'px-4 py-2 rounded-full font-display font-medium text-sm cursor-pointer border-[1.5px] transition-colors duration-150 motion-reduce:transition-none',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
                      activeFilter === filter.value
                        ? 'bg-orange text-white border-orange'
                        : 'bg-transparent text-ink border-line hover:border-blue hover:text-blue',
                    ].join(' ')}
                    aria-pressed={activeFilter === filter.value}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}

            {/* View toggle */}
            {showViewToggle && (
              <div className="flex items-center gap-1 rounded-full border border-line p-1" role="group" aria-label="Modo de visualização">
                <button
                  onClick={() => setView('grid')}
                  aria-pressed={view === 'grid'}
                  aria-label="Grade"
                  className={[
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display font-medium text-sm cursor-pointer transition-colors duration-150 motion-reduce:transition-none',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-1',
                    view === 'grid' ? 'bg-ink text-white' : 'text-mute hover:text-ink',
                  ].join(' ')}
                >
                  <GridIcon /> Grade
                </button>
                <button
                  onClick={() => setView('list')}
                  aria-pressed={view === 'list'}
                  aria-label="Lista"
                  className={[
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display font-medium text-sm cursor-pointer transition-colors duration-150 motion-reduce:transition-none',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-1',
                    view === 'list' ? 'bg-ink text-white' : 'text-mute hover:text-ink',
                  ].join(' ')}
                >
                  <ListIcon /> Lista
                </button>
              </div>
            )}
          </div>
        )}

        {/* Grid view */}
        {view === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <PortfolioCardGrid key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* List view */}
        {view === 'list' && (
          <div className="flex flex-col gap-3">
            {filtered.map((item) => (
              <PortfolioCardList key={item.id} item={item} />
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-mute font-display">
            Nenhum projeto encontrado.
          </div>
        )}
      </div>
    </section>
  )
}
