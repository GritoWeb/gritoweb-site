import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` ADD \`hero_title_max_width\` text DEFAULT 'none';`)
  await db.run(sql`ALTER TABLE \`_pages_v\` ADD \`version_hero_title_max_width\` text DEFAULT 'none';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`pages\` DROP COLUMN \`hero_title_max_width\`;`)
  await db.run(sql`ALTER TABLE \`_pages_v\` DROP COLUMN \`version_hero_title_max_width\`;`)
}
