'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import type { Media } from '@/payload-types'
import { parseTitle } from '@/utilities/parseTitle'
import { ArrowIcon } from '@/components/ui/ArrowIcon'

// ── Types ─────────────────────────────────────────────────────────────────────

export type PostItem = {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  date?: string | null
  categoryId?: string | null
  categoryLabel?: string | null
  image?: Media | null
}

export type FeaturedPostItem = PostItem

export type FilterOption = {
  label: string
  value: string
}

export type BlogListingClientProps = {
  posts: PostItem[]
  filters: FilterOption[]
  featuredPost?: FeaturedPostItem | null
  eyebrow?: string | null
  title?: string | null
  postsPerPage: number
  showSearch: boolean
  showFilters: boolean
}

// ── SVG helpers ───────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
)

// ── Primitives ────────────────────────────────────────────────────────────────

const filterPillBase = [
  'px-4 py-2 rounded-full font-display font-medium text-sm cursor-pointer',
  'border-[1.5px] transition-colors duration-150 motion-reduce:transition-none',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
].join(' ')

const tagBase =
  'inline-flex items-center px-3 py-1.5 rounded-full font-body text-xs font-bold uppercase tracking-[0.04em]'

const accentBg = ['bg-blue/8', 'bg-orange/10']

// ── Sub-components ────────────────────────────────────────────────────────────

function Tag({ children, index }: { children: React.ReactNode; index: number }) {
  const variant = index % 2 === 0 ? 'bg-blue/10 text-blue' : 'bg-orange/15 text-orange-700'
  return <span className={`${tagBase} ${variant}`}>{children}</span>
}

export function PostCard({ post, index }: { post: PostItem; index: number }) {
  const image = post.image
  const imageUrl =
    image && typeof image === 'object' && image.url ? image.url : null

  return (
    <a
      href={`/posts/${post.slug}`}
      className="flex flex-col bg-white rounded-3xl border border-line overflow-hidden no-underline text-inherit transition-shadow duration-150 motion-reduce:transition-none hover:shadow-[0_8px_28px_rgba(8,7,23,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <div className={`h-[200px] flex items-center justify-center overflow-hidden ${accentBg[index % 2]}`}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.alt ?? post.title}
            width={600}
            height={200}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
            className="w-full h-full max-w-[120px] max-h-[120px] object-cover"
          />
        ) : (
          <span className="font-display font-black text-5xl opacity-10 select-none">
            {post.title.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      <div className="px-6 pt-5 pb-6 flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          {post.categoryLabel && <Tag index={index}>{post.categoryLabel}</Tag>}
        </div>
        {post.date && (
          <time dateTime={post.date} className="font-mono text-xs text-mute">
            {new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(
              new Date(post.date),
            )}
          </time>
        )}
        <h3 className="m-0 font-bold text-[22px] leading-tight">{post.title}</h3>
        {post.excerpt && <p className="m-0 text-sm text-mute line-clamp-3">{post.excerpt}</p>}
        <span className="mt-2 font-display font-medium text-sm text-blue inline-flex items-center gap-1.5">
          Ler o post <ArrowIcon size={14} />
        </span>
      </div>
    </a>
  )
}

// ── FeaturedPostBanner ────────────────────────────────────────────────────────

function FeaturedPostBanner({ post }: { post: FeaturedPostItem }) {
  const imageUrl =
    post.image && typeof post.image === 'object' && post.image.url ? post.image.url : null

  const formattedDate = post.date
    ? new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(
        new Date(post.date),
      )
    : null

  return (
    <article className="max-w-7xl mx-auto mb-14">
      <a
        href={`/posts/${post.slug}`}
        className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr] bg-white rounded-[28px] overflow-hidden border border-line no-underline text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        <div className="relative bg-blue text-white p-12 flex flex-col justify-center min-h-[380px]">
          <span className="font-body font-bold text-xs uppercase tracking-[0.12em] text-white/85">
            ⭐ Post em destaque
          </span>
          <h2 className="m-0 mt-4 font-display font-bold text-white text-[44px] leading-[1.1]">
            {post.title}
          </h2>
          {post.excerpt && <p className="mt-4 max-w-xl text-white/85">{post.excerpt}</p>}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-white/90">
            {post.categoryLabel && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full font-body text-xs font-bold uppercase tracking-[0.04em] bg-orange text-white">
                {post.categoryLabel}
              </span>
            )}
            {formattedDate && <time dateTime={post.date ?? undefined}>{formattedDate}</time>}
          </div>
          <div className="mt-7">
            <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-orange text-white font-display font-bold text-sm">
              Ler o post <ArrowIcon size={14} />
            </span>
          </div>
        </div>
        <div className="bg-paper-dim flex items-center justify-center p-10 relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.image?.alt ?? post.title}
              width={400}
              height={360}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="w-full h-auto object-contain max-h-[320px]"
            />
          ) : (
            <span className="font-display font-black text-[8rem] text-blue/10 select-none">
              {post.title.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      </a>
    </article>
  )
}

// ── Main client component ─────────────────────────────────────────────────────

export function BlogListingClient({
  posts,
  filters,
  featuredPost,
  eyebrow,
  title,
  postsPerPage,
  showSearch,
  showFilters,
}: BlogListingClientProps) {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return posts.filter((p) => {
      const matchesCategory = activeFilter === 'all' || p.categoryId === activeFilter
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.excerpt ?? '').toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [posts, search, activeFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / postsPerPage))
  const safePage = Math.min(page, totalPages)
  const slice = filtered.slice((safePage - 1) * postsPerPage, safePage * postsPerPage)

  const handleFilterChange = (value: string) => {
    setActiveFilter(value)
    setPage(1)
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const buildPages = (): (number | '…')[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | '…')[] = [1]
    if (safePage > 3) pages.push('…')
    for (let i = Math.max(2, safePage - 1); i <= Math.min(totalPages - 1, safePage + 1); i++) {
      pages.push(i)
    }
    if (safePage < totalPages - 2) pages.push('…')
    pages.push(totalPages)
    return pages
  }

  return (
    <section className="px-6 md:px-12 !pt-0 py-24">
      <div className="max-w-7xl mx-auto">
        {featuredPost && <FeaturedPostBanner post={featuredPost} />}

        <div className="flex items-baseline justify-between gap-6 flex-wrap mb-6">
          <header className="flex flex-col gap-3 max-w-3xl">
            {eyebrow && <p className="font-eyebrow m-0">{eyebrow}</p>}
            <h2 className="m-0 text-blue">
              {parseTitle(title)}
            </h2>
          </header>

          {showSearch && (
            <div className="relative inline-flex">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mute pointer-events-none">
                <SearchIcon />
              </span>
              <input
                type="search"
                aria-label="Buscar posts"
                placeholder="Buscar no blog…"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full min-w-[280px] py-3 pl-11 pr-5 rounded-full border-[1.5px] border-line bg-white font-body text-sm text-ink placeholder:text-mute focus:outline-none focus:border-blue transition-colors duration-150 motion-reduce:transition-none"
              />
            </div>
          )}
        </div>

        {showFilters && filters.length > 0 && (
          <div
            className="pb-7 mb-7 border-b border-dashed border-line"
            role="group"
            aria-label="Filtrar por categoria"
          >
            <div className="flex flex-wrap gap-2.5 items-center">
              <span className="font-body font-bold text-xs uppercase tracking-[0.12em] text-mute mr-2">
                Filtrar por
              </span>
              {[{ label: 'Todos', value: 'all' }, ...filters].map((opt) => {
                const active = opt.value === activeFilter
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleFilterChange(opt.value)}
                    aria-pressed={active}
                    className={`${filterPillBase} ${
                      active
                        ? 'bg-blue text-white border-transparent'
                        : 'bg-transparent text-blue border-blue hover:bg-blue/5'
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {slice.length > 0 ? (
          <div key={safePage} className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {slice.map((post, i) => (
              <div
                key={post.id}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both motion-reduce:animate-none"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <PostCard post={post} index={(safePage - 1) * postsPerPage + i} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-mute py-20 animate-in fade-in duration-300 motion-reduce:animate-none">Nenhum post encontrado.</p>
        )}

        {totalPages > 1 && (
          <nav aria-label="Paginação" className="mt-12 flex justify-center items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
              aria-label="Página anterior"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full font-display font-medium cursor-pointer transition-colors duration-150 motion-reduce:transition-none bg-transparent text-blue border-[1.5px] border-line hover:border-blue disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              <ArrowIcon size={16} direction="left" />
            </button>

            {buildPages().map((p, i) =>
              p === '…' ? (
                <span key={`ellipsis-${i}`} className="h-10 w-10 inline-flex items-center justify-center text-mute">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p as number)}
                  aria-current={p === safePage ? 'page' : undefined}
                  className={`h-10 w-10 inline-flex items-center justify-center rounded-full font-display font-medium cursor-pointer transition-colors duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper ${
                    p === safePage
                      ? 'bg-blue text-white border-0'
                      : 'bg-transparent text-blue border-[1.5px] border-line hover:border-blue'
                  }`}
                >
                  {p}
                </button>
              ),
            )}

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              aria-label="Próxima página"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full font-display font-medium cursor-pointer transition-colors duration-150 motion-reduce:transition-none bg-transparent text-blue border-[1.5px] border-line hover:border-blue disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              <ArrowIcon size={16} />
            </button>
          </nav>
        )}
      </div>
    </section>
  )
}
