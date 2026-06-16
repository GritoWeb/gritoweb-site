/**
 * Rebuild the `posts_fts` full-text search index for ALL published posts (every locale),
 * using the same indexing logic as the Payload hooks.
 *
 * Run locally after applying the migration:
 *   pnpm tsx scripts/reindex-search.ts
 *
 * Targets the LOCAL miniflare D1 (never remote/production), because payload.config and the
 * getD1() helper both use wrangler's getPlatformProxy with remote bindings disabled when
 * NODE_ENV !== 'production'. Do NOT run this with NODE_ENV=production.
 */
import 'dotenv/config' // must load .env before payload.config reads PAYLOAD_SECRET

import { getPayload } from 'payload'

import config from '../src/payload.config'
import { getD1 } from '../src/lib/d1'
import { reindexAllPosts } from '../src/lib/postsSearchIndex'

async function main() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Refusing to run reindex-search against production. Unset NODE_ENV=production.')
  }

  const payload = await getPayload({ config })
  const d1 = await getD1()

  console.log('Reindexing posts_fts (published posts, all locales)…')
  const { posts, rows } = await reindexAllPosts(d1, payload)
  console.log(`Done. Indexed ${rows} locale row(s) across ${posts} published post(s).`)

  process.exit(0)
}

main().catch((err) => {
  console.error('Reindex failed:', err)
  process.exit(1)
})
