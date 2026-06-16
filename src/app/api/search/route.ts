import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Media, Post, Tag } from '@/payload-types'
import { getD1 } from '@/lib/d1'
import { buildFtsMatchQuery } from '@/lib/buildFtsMatchQuery'

export const dynamic = 'force-dynamic'

const DEFAULT_LIMIT = 100
const MAX_LIMIT = 200

type SearchPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  date: string | null
  categoryId: string | null
  categoryLabel: string | null
  image: Media | null
}

type HydratedPost = Pick<
  Post,
  'id' | 'title' | 'slug' | 'excerpt' | 'tags' | 'publishedAt' | 'featuredImage' | 'meta'
>

function toSearchPost(post: HydratedPost): SearchPost {
  const firstTag =
    Array.isArray(post.tags) && post.tags.length > 0 ? (post.tags[0] as Tag) : null
  const featuredImage =
    post.featuredImage && typeof post.featuredImage === 'object' ? (post.featuredImage as Media) : null
  const metaImage =
    post.meta?.image && typeof post.meta.image === 'object' ? (post.meta.image as Media) : null

  return {
    id: String(post.id),
    title: post.title ?? '',
    slug: post.slug,
    excerpt: post.excerpt ?? post.meta?.description ?? null,
    date: post.publishedAt ?? null,
    categoryId: firstTag?.id != null ? String(firstTag.id) : null,
    categoryLabel: firstTag?.title ?? null,
    image: featuredImage ?? metaImage,
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const payload = await getPayload({ config: configPromise })

  // Validate locale against the configured codes (default to defaultLocale).
  const localization = payload.config.localization
  const codes = localization ? localization.locales.map((l) => (typeof l === 'string' ? l : l.code)) : []
  const requestedLocale = searchParams.get('locale') ?? ''
  const locale =
    codes.includes(requestedLocale) && localization
      ? requestedLocale
      : (localization ? localization.defaultLocale : 'pt')

  const limit = Math.min(MAX_LIMIT, Math.max(1, Number(searchParams.get('limit')) || DEFAULT_LIMIT))
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const offset = (page - 1) * limit

  const match = buildFtsMatchQuery(searchParams.get('q') ?? '')

  // Nothing searchable → empty result (don't run an empty MATCH).
  if (!match) {
    return Response.json({ docs: [], page, limit, totalDocs: 0, totalPages: 0, hasNextPage: false })
  }

  const d1 = await getD1()

  const [rowsRes, countRes] = await Promise.all([
    d1
      .prepare(
        'SELECT parent_id FROM posts_fts WHERE posts_fts MATCH ? AND locale = ? ORDER BY rank LIMIT ? OFFSET ?',
      )
      .bind(match, locale, limit, offset)
      .all<{ parent_id: number }>(),
    d1
      .prepare('SELECT count(*) AS c FROM posts_fts WHERE posts_fts MATCH ? AND locale = ?')
      .bind(match, locale)
      .first<{ c: number }>(),
  ])

  const ids = (rowsRes.results ?? []).map((r) => r.parent_id)
  const totalDocs = countRes?.c ?? 0
  const totalPages = Math.ceil(totalDocs / limit)

  if (ids.length === 0) {
    return Response.json({ docs: [], page, limit, totalDocs, totalPages, hasNextPage: page < totalPages })
  }

  // Hydrate with access control applied (overrideAccess:false → public sees published only).
  const hydrated = await payload.find({
    collection: 'posts',
    where: { id: { in: ids } },
    locale: locale as 'pt' | 'en',
    depth: 1,
    limit: ids.length,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      excerpt: true,
      tags: true,
      publishedAt: true,
      featuredImage: true,
      meta: true,
    },
  })

  // Preserve FTS rank ordering (payload.find with `in` does not guarantee order).
  const byId = new Map(hydrated.docs.map((doc) => [Number(doc.id), doc as HydratedPost]))
  const docs = ids
    .map((id) => byId.get(id))
    .filter((doc): doc is HydratedPost => Boolean(doc))
    .map(toSearchPost)

  return Response.json({ docs, page, limit, totalDocs, totalPages, hasNextPage: page < totalPages })
}
