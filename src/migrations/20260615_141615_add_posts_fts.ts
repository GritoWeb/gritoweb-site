import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

/**
 * Full-text search index for the `posts` collection (Cloudflare D1 / SQLite FTS5).
 *
 * This is a STANDALONE (contentless-less) FTS5 table — it is NOT an external-content
 * table and has NO triggers wired to `posts_locales`. Reason: `posts.content` is stored
 * as Lexical JSON, so SQLite triggers reading the raw column would index JSON garbage.
 * Instead, the rows are kept in sync from JavaScript (Payload hooks + a reindex script),
 * after flattening the Lexical tree to plain text. See:
 *   - src/utilities/getPlainTextFromLexical.ts
 *   - src/lib/postsSearchIndex.ts
 *   - src/collections/Posts/hooks/syncPostSearchIndex.ts
 *   - scripts/reindex-search.ts
 *
 * Tokenizer: unicode61 + `remove_diacritics 2` → case- and accent-insensitive search,
 * which is essential for Portuguese (e.g. "cafe" matches "café"). Do NOT switch this to
 * the trigram tokenizer.
 *
 * One row per (post, locale). `parent_id` references posts.id (UNINDEXED → stored but not
 * tokenized so it can be filtered/returned). `locale` is likewise UNINDEXED.
 *
 * ⚠️ Caveat: Cloudflare D1 cannot export a database that contains virtual tables. To run
 * `wrangler d1 export` you must first `DROP TABLE posts_fts`, export, then recreate it
 * (re-run the migration + `pnpm tsx scripts/reindex-search.ts`).
 */
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    CREATE VIRTUAL TABLE \`posts_fts\` USING fts5(
      title,
      excerpt,
      content,
      parent_id UNINDEXED,
      locale UNINDEXED,
      tokenize='unicode61 remove_diacritics 2'
    );
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE IF EXISTS \`posts_fts\`;`)
}
