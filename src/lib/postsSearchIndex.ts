import type { Payload } from 'payload'

import { getPlainTextFromLexical } from '../utilities/getPlainTextFromLexical'

type D1 = CloudflareEnv['D1']

/** Locale codes configured for the project (e.g. ['pt', 'en']), read from the live config. */
export function getLocaleCodes(payload: Payload): string[] {
  const loc = payload.config.localization
  if (!loc) return []
  return loc.locales.map((l) => (typeof l === 'string' ? l : l.code))
}

/**
 * With `locale: 'all'`, Payload returns localized fields as a `{ pt: ..., en: ... }` map.
 * Resolve a single locale's value, while leaving already-flat values untouched.
 */
function pickLocale(field: unknown, code: string, codes: string[]): unknown {
  if (
    field &&
    typeof field === 'object' &&
    !Array.isArray(field) &&
    Object.keys(field as object).length > 0 &&
    Object.keys(field as object).every((k) => codes.includes(k))
  ) {
    return (field as Record<string, unknown>)[code]
  }
  return field
}

function asText(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

/** Remove every FTS row for a post (all locales). */
export async function deletePostFromSearchIndex(d1: D1, postId: number | string): Promise<void> {
  await d1.prepare('DELETE FROM posts_fts WHERE parent_id = ?').bind(Number(postId)).run()
}

/**
 * Replace the FTS rows for a single post given its `locale: 'all'` document. One row per
 * locale that has any text. Delete + inserts run in one `d1.batch` (atomic). Returns the
 * number of locale rows written.
 */
export async function writePostSearchRows(
  d1: D1,
  payload: Payload,
  doc: Record<string, unknown>,
): Promise<number> {
  const id = Number(doc.id)
  const codes = getLocaleCodes(payload)

  const statements: D1PreparedStatement[] = [
    d1.prepare('DELETE FROM posts_fts WHERE parent_id = ?').bind(id),
  ]

  for (const code of codes) {
    const title = asText(pickLocale(doc.title, code, codes))
    const excerpt = asText(pickLocale(doc.excerpt, code, codes))
    const content = getPlainTextFromLexical(pickLocale(doc.content, code, codes))

    // Skip locales with no indexable text (e.g. untranslated).
    if (!title && !excerpt && !content) continue

    statements.push(
      d1
        .prepare(
          'INSERT INTO posts_fts (title, excerpt, content, parent_id, locale) VALUES (?, ?, ?, ?, ?)',
        )
        .bind(title, excerpt, content, id, code),
    )
  }

  await d1.batch(statements)
  return statements.length - 1
}

/**
 * Recompute the index for one post by id. Fetches the published doc across all locales and
 * (re)writes its rows; if the post is missing or not published, removes it from the index.
 * Pass `req` so the read is consistent with the current request/transaction.
 */
export async function reindexPostById(
  d1: D1,
  payload: Payload,
  id: number | string,
  req?: Parameters<Payload['findByID']>[0]['req'],
): Promise<number> {
  let doc: Record<string, unknown> | null = null
  try {
    doc = (await payload.findByID({
      collection: 'posts',
      id,
      locale: 'all',
      depth: 0,
      draft: false,
      overrideAccess: true,
      req,
    })) as unknown as Record<string, unknown>
  } catch {
    doc = null
  }

  if (!doc || doc._status !== 'published') {
    await deletePostFromSearchIndex(d1, id)
    return 0
  }

  return writePostSearchRows(d1, payload, doc)
}

/**
 * Full rebuild of the index: wipe `posts_fts` (clears orphans from deleted/unpublished
 * posts) and re-insert every published post across all locales. Used by the reindex script.
 */
export async function reindexAllPosts(
  d1: D1,
  payload: Payload,
): Promise<{ posts: number; rows: number }> {
  await d1.prepare('DELETE FROM posts_fts').run()

  let page = 1
  let posts = 0
  let rows = 0

  for (;;) {
    const res = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      locale: 'all',
      depth: 0,
      limit: 100,
      page,
      pagination: true,
      draft: false,
      overrideAccess: true,
    })

    for (const doc of res.docs) {
      rows += await writePostSearchRows(d1, payload, doc as unknown as Record<string, unknown>)
      posts += 1
    }

    if (!res.hasNextPage) break
    page += 1
  }

  return { posts, rows }
}
